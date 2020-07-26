import React, { useState, useContext, useEffect } from 'react';
import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { Avatar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { loginSelector } from '../../../redux/slices/loginSlice';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function ChatRoom({ route, navigation }) {

    const { userInfo } = useSelector(loginSelector)
    const [messages, setMessages] = useState([]);
    const { thread } = route.params;




    useEffect(() => {
        const messagesListener = getMessages()
        // Stop listening for updates whenever the component unmounts
        return () => messagesListener();
    }, []);


    getMessages = () => {
        return firestore()
            .collection('THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages1 = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data();

                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData
                    };

                    if (!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user,
                            name: firebaseData.user.username
                        };
                    }

                    return data;
                });
                setMessages(messages1);
            });
    }

    const handleSend = (messages) => {
        const text = messages[0].text;
        updateMessage(text)
        // alert(JSON.stringify(thread.ids))
    }


    const updateMessage = async (text) => {

        firestore()
            .collection('THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: userInfo._id,
                    email: userInfo.email,
                    name: userInfo.username
                }
            });

        await firestore()
            .collection('THREADS')
            .doc(thread._id)
            .set(
                {
                    latestMessage: {
                        text,
                        createdAt: new Date().getTime()
                    }
                },
                { merge: true }
            );

        sendNotification(text)
    }


    const sendNotification = (text) => {
        receiverId = thread.ids.filter(ele => ele != user._id);
        dataobj = {
            ...thread,
            type: "CHAT",
            name: userInfo.username
        }
        fetch('https://teachmeproject.herokuapp.com/sendChatNotification', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": userInfo.username,
                "message": text,
                "_id": receiverId[0],
                "data": dataobj
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // Showing response message coming from server after inserting records.
            }).catch((error) => {
                console.error(error);
            });
    }



    function renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#105883'
                    },
                    left: {
                        backgroundColor: '#fff'
                    }
                }}
                textStyle={{
                    left: {
                        color: '#105883'
                    },
                    right: {
                        color: '#fff'
                    }
                }}
            />
        );
    }

    function renderLoading() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#6646ee' />
            </View>
        );
    }

    function renderSend(props) {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <IconButton icon='send-circle' size={32} color='#105883' />
                </View>
            </Send>
        );
    }

    function scrollToBottomComponent() {
        return (
            <View style={styles.bottomComponentContainer}>
                <IconButton icon='chevron-double-down' size={36} color='#105883' />
            </View>
        );
    }

    function renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                wrapperStyle={styles.systemMessageWrapper}
                textStyle={styles.systemMessageText}
            />
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}  >
            <View style={styles.headerComponent}>
                <Icons
                    name={"keyboard-backspace"}
                    // color="#fff"
                    size={27}
                    // style={{ flex: 0.2 }}
                    onPress={() => navigation.goBack()}
                />
                <View style={{
                    // alignItems: 'center',
                    // justifyContent: "center",
                    // flex: 0.6
                    marginLeft: 25
                }}>
                    <TouchableOpacity>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Avatar
                                rounded
                                containerStyle={{ margin: 7 }}
                                size={30}
                                source={require('../../../assets/img/default-mask-avatar.png')}
                            />
                            <Text style={styles.headerTitle} numberOfLines={1}>{thread.name}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* <Icons
                    name={"camera"}
                    // color="#fff"
                    size={27}
                    style={{ flex: 0.2 }}
                    onPress={() => handleAddPicture()}
                /> */}
            </View>
            <GiftedChat
                messages={messages}
                onSend={handleSend}
                user={{ _id: userInfo._id }}
                placeholder='Type your message here...'
                alwaysShowSend
                showUserAvatar={false}
                scrollToBottom
                renderBubble={renderBubble}
                // renderLoadEarlier={true}
                // renderAvatar={null}
                renderSend={renderSend}
                scrollToBottomComponent={scrollToBottomComponent}
                // renderSystemMessage={renderSystemMessage}
                showAvatarForEveryMessage={false}
                renderAvatarOnTop={true}
            // renderActions={() => (
            //     <Feather
            //         style={styles.uploadImage}
            //         onPress={this.uploadImage}
            //         name='image'
            //         size={30}
            //         color='#000'
            //     />
            // )}
            // bottomOffset={155}
            // isTyping={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    systemMessageWrapper: {
        backgroundColor: '#6646ee',
        borderRadius: 4,
        padding: 5
    },
    systemMessageText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold'
    },
    headerTitle: {
        fontSize: 20,
        letterSpacing: 1,
        fontFamily: "sans-serif",
        fontWeight: "bold"
    },
    headerComponent: {
        flexDirection: "row",
        height: 80,
        alignItems: 'center',
    },
});
