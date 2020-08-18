import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Image, RefreshControl, TextInput } from 'react-native';
import { IconButton, List, Divider, Button, ActivityIndicator, Colors } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux'
import { notificationSelector, setNotificationsList } from '../../../redux/slices/notificationSlice';
import { loginSelector } from '../../../redux/slices/loginSlice';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';

export default function NotificationPage({ navigation }) {

    const { userInfo } = useSelector(loginSelector);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const { notificationsList } = useSelector(notificationSelector)

    useEffect(() => {
        if (!notificationsList.length)
            getNotifications()
    }, []);


    getNotifications = () => {
        setLoading(true);
        firestore()
            .collection('NOTIFICATIONS')
            .where(
                "receiverId", "==", userInfo._id
            ).get()
            .then(snapshot => {
                notificationsArr = []
                snapshot.forEach(documentSnapshot => {
                    const data = {
                        _id: documentSnapshot.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...documentSnapshot.data()
                    };

                    notificationsArr.push(data)
                });
                dispatch(setNotificationsList(notificationsArr));
                setLoading(false);
            }, (error) => {
                setLoading(false);
            });
    }

    changestatus = async (item, status) => {
        setLoading(true);
        await firestore()
            .collection('NOTIFICATIONS')
            .doc(item._id)
            .set(
                {
                    status: status
                },
                { merge: true }
            ).then(() => {
                updateRequestedCourse(item, status)
            }, (error) => {
                console.error(error);
                setLoading(false);
                alert("something went wrong")
            })
    }

    updateRequestedCourse = (item, status) => {
        fetch('https://teachmeproject.herokuapp.com/updateStatus', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uid": item.senderId,
                "courseid": item.courseid,
                "status": status
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                sendNotification(item, status);
            }).catch((error) => {
                console.error(error);
                setLoading(false);
                alert("something went wrong")
            });
    }

    sendNotification = (item, status) => {

        notifyobj = {
            senderName: userInfo.username,
            senderId: userInfo._id,
            receiverName: item.senderName,
            receiverId: item.senderId,
            status: status,
            type: "INFO",
            createdAt: new Date().getTime(),
            message: status == "ACCEPTED" ? "Accepted your request" : "Declined your request"
            // _id: docRef._id,
            // ids: [userInfo._id, item._id],
            // senderName: userInfo.username,
            // senderId: userInfo._id,
            // receiverName: item.senderName,
            // receiverId: item.senderId,
            // createdAt: new Date().getTime(),
            // message: "accepted your request"
        }

        firestore().collection('NOTIFICATIONS').add(notifyobj).then(docRef => {
            fetch('https://teachmeproject.herokuapp.com/sendChatNotification', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": userInfo.username,
                    "message": notifyobj.message,
                    "_id": item.senderId,
                    "thread": notifyobj
                })

            }).then((response) => response.json())
                .then((responseJson) => {
                    setLoading(false);
                    navigation.goBack();
                }).catch((error) => {
                    setLoading(false);
                    console.error(error);
                    alert("something went wrong")
                });
        }, (error) => {
            setLoading(false);
            console.error(error);
            alert("something went wrong")
        });
    }

    const loadingComponent = () => {
        return (
            <View style={styles.loadingBar}>
                <ActivityIndicator size={35} animating={true} color={Colors.black} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerComponent}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons
                        name={"keyboard-backspace"}
                        // color="#fff"
                        size={27}
                    // style={{ flex: 0.2 }}
                    />
                </TouchableOpacity>
                <View style={{
                    alignItems: 'center',
                    paddingLeft: 20,
                    justifyContent: "center",
                    // flex: 0.4
                }}>
                    <Text style={styles.headerTitle} numberOfLines={1}>Notifications</Text>
                </View>
            </View>
            {!loading && !!notificationsList.length &&
                <FlatList
                    data={notificationsList}
                    keyExtractor={item => item._id}
                    ItemSeparatorComponent={() => <Divider />}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={getNotifications}
                        />
                    }
                    renderItem={({ item }) => (
                        <View>
                            {item.type != "REQUEST" && <List.Item
                                title={item.senderName}
                                description={item.message}
                                left={props => <List.Icon  {...props} style={{ fontSize: 30 }} icon="bell" />}
                                // titleNumberOfLines={1}
                                titleStyle={styles.listTitle}
                                descriptionStyle={styles.listDescription}
                            // descriptionNumberOfLines={1}
                            />
                            }
                            {item.type == "REQUEST" &&
                                <List.Accordion
                                    title={item.senderName}
                                    description={item.message}
                                    left={props => <List.Icon  {...props} style={{ fontSize: 30 }} icon="bell" />}
                                >
                                    <View style={styles.iconContainer}>
                                        <Button disabled={item.status == "ACCEPTED"} icon="check-outline" mode="outlined" onPress={() => changestatus(item, "ACCEPTED")}>
                                            Accept
                                    </Button>
                                        <Button disabled={item.status == "REJECTED"} icon="close-outline" mode="outlined" onPress={() => changestatus(item, "REJECTED")}>
                                            Reject
                                    </Button>
                                    </View>

                                </List.Accordion>
                            }
                        </View>

                    )}
                />
            }
            {!!loading && loadingComponent()}

            {!loading && !notificationsList.length &&
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Image
                        // width={Dimensions.get('window').width}
                        //     resizeMode={"center"}
                        style={styles.backgroundImage}
                        source={require('../../../assets/img/notification.png')}
                    />
                    <Text style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: "center",
                        fontSize: 20,
                        color: "#105883",
                    }}>
                        You have no notifications!
                  </Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 20
    },
    datetime: {
        marginTop: 20
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20
    },
    listTitle: {
        fontSize: 22
    },
    listDescription: {
        fontSize: 16
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 300
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
