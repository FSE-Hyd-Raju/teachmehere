import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Button } from 'react-native';
import { IconButton, Title, List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import { Avatar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux'
import { loginSelector } from '../../../redux/slices/loginSlice'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NewChat({ navigation }) {
    const [roomName, setRoomName] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userInfo } = useSelector(loginSelector)

    useEffect(() => {

        getRequestedCourses()

    }, []);

    const getRequestedCourses = () => {
        fetch('https://teachmeproject.herokuapp.com/requestedCoursesByid', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "uid": userInfo._id,
            })
        }).then((response) => response.json())
            .then((requestedJson) => {
                if (requestedJson.length) {
                    let userslist = requestedJson.filter((ele, ind) => (ele.request_status == "ACCEPTED") && (ind === requestedJson.findIndex(elem => elem.username === ele.username)))
                    console.log(userslist)
                    setAllUsers(userslist)
                }

                setLoading(false);
            }).catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }


    function sendRequest(item) {
        setLoading(true);
        fetch('https://teachmeproject.herokuapp.com/addToRequestedCourses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uid": user._id,
                "courseid": item._id,
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                addFirebaseNotification(item);
            }).catch((error) => {
                navigation.navigate('Home');
                console.error(error);
                setLoading(false);
            });
    }


    const addFirebaseNotification = (item) => {
        // notifyobj = {
        //     senderName: user.username,
        //     senderId: user._id,
        //     receiverName: item.username,
        //     receiverId: item._id,
        //     status: "PENDING",
        //     type: "REQUEST",
        //     createdAt: new Date().getTime(),
        //     message: "Lets be friends..!"
        // }

        // firestore().collection('NOTIFICATIONS').add(notifyobj).then(docRef => {
        //     sendNotification(item, notifyobj)
        // });
    }


    const sendNotification = (item, notifyobj) => {
        fetch('https://teachmeproject.herokuapp.com/sendChatNotification', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": user.username,
                "message": notifyobj.message,
                "_id": item._id,
                "data": notifyobj
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                alert("Notification sent to the user")
                navigation.navigate('Home');
                setLoading(false);
                // Showing response message coming from server after inserting records.
            }).catch((error) => {
                navigation.navigate('Home');
                console.error(error);
                setLoading(false);
            });
    }


    function sendMessage(item) {
        // const ref = firestore().collection('THREADS').doc()

        // obj = {
        //     // id: ref.id,
        //     userDetails: [{
        //         id: user._id,
        //         name: user.username
        //     }, {
        //         id: item._id,
        //         name: item.username
        //     }],
        //     ids: [user._id, item._id],
        //     latestMessage: {
        //         text: `You have joined the room.`,
        //         createdAt: new Date().getTime()
        //     }
        // }
        // ref.set(obj)
        //     .then(() => {
        //         // ref.get().then(doc => {
        //         //    alert(JSON.stringify(doc.data()))
        //         // })
        //         ref.collection('MESSAGES').add({
        //             text: `You have joined the room.`,
        //             createdAt: new Date().getTime(),
        //             system: true
        //         });
        //         item = {
        //             ...item,
        //             ...obj,
        //             _id: ref.id,
        //             name: item.username
        //         }
        //         navigation.navigate('Room', { thread: item });
        //     })

    }

    const checkIfChatExists = (item) => {
        exists = false;
        firestore().collection('THREADS').
            where("ids", "array-contains", user._id).
            get().then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    data = documentSnapshot.data();
                    if (data["ids"].indexOf(item._id) > -1) {
                        exists = true;

                        item = {
                            ...item,
                            _id: documentSnapshot.id,
                            name: item.username
                        }
                    }
                })
                if (!exists) {
                    sendMessage(item)
                } else {
                    navigation.navigate('Room', { thread: item });
                }
            });
    };



    return (
        <View style={styles.rootContainer}>
            <View style={styles.headerComponent}>
                <Icons
                    name={"keyboard-backspace"}
                    // color="#fff"
                    size={27}
                    style={{ flex: 0.2 }}
                    onPress={() => navigation.goBack()}
                />
                <View style={{
                    alignItems: 'center',
                    justifyContent: "center",
                    flex: 0.4
                }}>
                    <Text style={styles.headerTitle} numberOfLines={1}>New Chat</Text>
                </View>
            </View>
            <FlatList
                data={allUsers}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <Divider />}

                renderItem={({ item }) => (
                    <List.Item
                        title={item.username}
                        left={props => <Avatar
                            rounded
                            containerStyle={{ margin: 7, marginTop: 15 }}
                            size={30}
                            source={require('../../../assets/img/default-mask-avatar.png')}
                        />}
                        right={props => <Icons
                            style={{ margin: 7, marginTop: 20 }}
                            name={"message-text-outline"}
                            color="rgb(102, 94, 94)"
                            size={25}
                        />}
                        description={item.coursename}
                        // right={props =>
                        //     <View style={styles.iconContainer}>
                        //         {!item.request_status && <Button title="Send Request" onPress={() => sendRequest(item)} />}
                        //         {(item.request_status == "REJECTED" || item.request_status == "PENDING") && <Button title={item.request_status} disabled={true} />}
                        //         {item.request_status == "ACCEPTED" && <Button title="Message" onPress={() => checkIfChatExists(item)} />}
                        //     </View>
                        // }
                        // titleNumberOfLines={1}
                        titleStyle={styles.listTitle}
                        descriptionStyle={styles.listDescription}
                        descriptionNumberOfLines={1}
                        titleNumberOfLines={1}
                        style={{ padding: 15, justifyContent: "center", alignItems: "center" }}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 36
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 150
    },
    rootContainer: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 10
    },
    listTitle: {
        fontSize: 20
    },
    listDescription: {
        fontSize: 15
    },
    headerTitle: {
        fontSize: 20,
        letterSpacing: 1,
        fontFamily: "sans-serif",
        // fontWeight: "bold"
    },
    headerComponent: {
        flexDirection: "row",
        height: 80,
        alignItems: 'center',
    },
});
