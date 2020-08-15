import React, { useState, useContext, useEffect } from 'react';
import { GiftedChat, Bubble, Send, SystemMessage, Time, Message, Avatar as Ava } from 'react-native-gifted-chat';
import { View, StyleSheet, Text, BackHandler, Alert } from 'react-native';
import { IconButton, TextInput, ActivityIndicator, Colors } from 'react-native-paper';
import { Avatar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { loginSelector } from '../../../redux/slices/loginSlice';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OptionsMenu from "react-native-options-menu";
import { chatSelector, setLoading } from '../../../redux/slices/chatSlice';
export default function ChatRoom({ route, navigation }) {

    const { userInfo } = useSelector(loginSelector)
    const [messages, setMessages] = useState([]);

    const { loading } = useSelector(chatSelector)
    const dispatch = useDispatch()


    const { thread } = route.params;

    const backButtonHandler = () => {
        return BackHandler.addEventListener(
            'hardwareBackPress',
            function () {
                checkToRemoveChat();
                return false;
            },
        );
    }

    useEffect(() => {
        let backhandler = backButtonHandler()
        const messagesListener = getMessages();
        // dispatch(setLoading(false));


        // Stop listening for updates whenever the component unmounts
        return () => {
            backhandler.remove();
            messagesListener();
        };
    }, []);

    const checkToRemoveChat = () => {
        if (thread.newChat && (!messages || !messages.length)) {
            firestore()
                .collection('THREADS')
                .doc(thread._id).delete().then(() => navigation.goBack())
        } else {
            navigation.goBack()
        }

    }


    getMessages = () => {
        return firestore()
            .collection('THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .orderBy('serverTime', 'desc')
            .onSnapshot(querySnapshot => {
                const messagesArr = []
                for (var i in querySnapshot.docs) {
                    const doc = querySnapshot.docs[i]
                    // const messagesArr = querySnapshot.docs.filter(doc => {
                    const firebaseData = doc.data();

                    if (!firebaseData.deletedIds || !firebaseData.deletedIds.length || (firebaseData.deletedIds.length && firebaseData.deletedIds.indexOf(userInfo._id) == -1)) {
                        const data = {
                            _id: doc.id,
                            text: '',
                            createdAt: new Date().getTime(),
                            ...firebaseData
                        };

                        // if (!firebaseData.system) {
                        //     data.user = {
                        //         ...firebaseData.user,
                        //         name: firebaseData.user.username
                        //     };
                        // }
                        messagesArr.push(data);
                    }

                    // });
                }
                setMessages(messagesArr);
            });
    }

    const handleSend = (messages) => {
        const text = messages[0].text;
        updateMessage(text)
        // alert(JSON.stringify(thread.ids))
    }


    const updateMessage = async (text) => {

        await firestore()
            .collection('THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .add({
                text: text,
                serverTime: new Date().getTime(),
                // serverTime: firestore.FieldValue.serverTimestamp(),
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
                        text: text,
                        createdAt: new Date().getTime(),
                        serverTime: new Date().getTime(),
                        // serverTime: firestore.FieldValue.serverTimestamp()
                    },
                    deletedIds: [],
                    newChat: false,
                    displaypic: userInfo.displaypic
                },
                { merge: true }
            );

        sendNotification(text)
    }


    const sendNotification = (text) => {
        console.log("thread")
        // console.log(thread)
        // console.log(thread.ids)
        receiverId = thread.ids.filter(ele => ele != userInfo._id);
        dataobj = {
            ...thread,
            type: "CHAT",
            name: userInfo.username,
        }
        dataobj.displaypic = ""
        dataobj.userDetails = dataobj.userDetails.map((elem) => {
            elem.displaypic = null
            console.log("elem")
            console.log(elem)
            return elem
        })
        console.log("dataobj")
        console.log(dataobj)
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
                        backgroundColor: 'rgb(0, 95, 132)'
                    },
                    left: {
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        borderColor: "rgb(217, 231, 235)",
                        borderWidth: 1
                    }
                }}
                textStyle={{
                    left: {
                        paddingVertical: 8,
                        paddingHorizontal: 5,
                        color: 'black'
                    },
                    right: {
                        paddingVertical: 8,
                        paddingHorizontal: 5,
                        color: 'white'
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

    function renderTime(props) {
        return (
            <Time
                {...props}
                timeTextStyle={{
                    right: {
                        color: "white"
                    },
                    left: {
                        color: "#7b8a91"
                    }
                }}
            />
        );
    }

    function renderMessage(props) {
        return (
            <Message
                {...props}
                timeTextStyle={{
                    right: {
                        color: "white"
                    },
                    left: {
                        color: "#7b8a91"
                    }
                }}
            />
        );
    }

    function renderMessage(props) {
        return (
            <Message
                {...props}
                containerStyle={{
                    right: {
                        paddingRight: 5
                    },
                    left: {
                        paddingLeft: 10
                    }
                }}
            />
        );
    }

    function renderAvatar(props) {
        return (
            <Ava
                {...props}
                imageStyle={{
                    left: {
                        backgroundColor: "rgb(0, 62, 86)"
                    }
                }}
            />
        );
    }

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    const deleteConfirmed = async () => {
        dispatch(setLoading(true));

        const querySnapshot = await firestore()
            .collection('THREADS')
            .doc(thread._id)
            .collection('MESSAGES').get();

        for (var i in querySnapshot.docs) {
            const document = querySnapshot.docs[i]
            const data = document.data()
            if (data.deletedIds && data.deletedIds.length && data.deletedIds.indexOf(userInfo._id) == -1) {
                await firestore()
                    .collection('THREADS')
                    .doc(thread._id)
                    .collection('MESSAGES')
                    .doc(document.id).delete()
            } else {
                await firestore()
                    .collection('THREADS')
                    .doc(thread._id)
                    .collection('MESSAGES')
                    .doc(document.id)
                    .set(
                        {
                            deletedIds: [userInfo._id]
                        },
                        { merge: true }
                    );
            }
        }

        const threadquerySnapshot = await firestore()
            .collection('THREADS')
            .doc(thread._id).get();

        // console.log(threadquerySnapshot.data)
        if (threadquerySnapshot.data && threadquerySnapshot.data.deletedIds && threadquerySnapshot.data.deletedIds.length && threadquerySnapshot.data.deletedIds.indexOf(userInfo._id) == -1) {
            await firestore()
                .collection('THREADS')
                .doc(thread._id).delete();
        }
        else {
            await firestore()
                .collection('THREADS')
                .doc(thread._id)
                .set(
                    {
                        deletedIds: [userInfo._id]
                    },
                    { merge: true }
                );
        }

        navigation.goBack();
        dispatch(setLoading(false));
        return;

    }

    const deleteChat = () => {
        Alert.alert(
            "",
            "Do you want to delete the chat?",
            [
                {
                    text: "No",
                    onPress: () => console.log("No Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => deleteConfirmed() }
            ],
            { cancelable: false }
        );


        // await foreach(querySnapshot,  (documentSnapshot) => {
        //     // await firestore()
        //     //     .collection('THREADS')
        //     //     .doc(thread._id)
        //     //     .collection('MESSAGES')
        //     //     .doc(documentSnapshot.id)
        //     //     .set(
        //     //         {
        //     //             deletedIds: [userInfo._id]
        //     //         },
        //     //         { merge: true }
        //     // );
        //     alert(documentSnapshot.id)
        // });
        // querySnapshot.forEach(async (documentSnapshot) => {
        //     // data = documentSnapshot.data();
        //     // if (data["ids"].indexOf(item.userinfo._id) > -1) {
        //     //     exists = true;

        //     //     item = {
        //     //         ...item,
        //     //         _id: documentSnapshot.id,
        //     //         name: item.userinfo.username
        //     //     }
        //     // }
        //     await firestore()
        //         .collection('THREADS')
        //         .doc(thread._id)
        //         .collection('MESSAGES')
        //         .doc(documentSnapshot.id)
        //         .set(
        //             {
        //                 deletedIds: [userInfo._id]
        //             },
        //             { merge: true }
        //         );

        // })
    }

    const loadingComponent = () => {
        return (
            <View style={styles.loadingBar}>
                <ActivityIndicator size={35} animating={true} color={Colors.black} />
            </View>
        )
    }

    // const deleteChat = () => {
    //     alert("deleteChat")
    // }

    const blockUser = () => {
        alert("blockUser")
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 0 }}  >
            <View style={styles.headerComponent}>
                <Icons
                    name={"keyboard-backspace"}
                    // color="#fff"
                    size={27}
                    style={{ flex: 0.1 }}
                    onPress={() => checkToRemoveChat()}
                />
                <View style={{
                    alignItems: "center",
                    // justifyContent: "center",
                    flex: 0.9,
                    flexDirection: "row",
                    marginLeft: 25,
                    justifyContent: "space-between"
                }}>
                    <TouchableOpacity >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Avatar
                                rounded
                                containerStyle={{ margin: 7 }}
                                size={30}
                                // source={require('../../../assets/img/default-mask-avatar.png')}
                                source={thread.displaypic ? { uri: thread.displaypic } : require('../../../assets/img/default-mask-avatar.png')}
                            />
                            <Text style={styles.headerTitle} numberOfLines={1}>{thread.name}</Text>
                        </View>
                    </TouchableOpacity>
                    <OptionsMenu
                        customButton={<Icons name={"dots-vertical"}    // color="#fff"
                            size={25}
                            style={{ paddingRight: 15 }}
                        />}
                        destructiveIndex={1}
                        options={["Delete Chat", "Block"]}
                        actions={[deleteChat, blockUser]} />
                </View>
                {/* <Icons
                    name={"camera"}
                    // color="#fff"
                    size={27}
                    style={{ flex: 0.2 }}
                    onPress={() => handleAddPicture()}
                /> */}
            </View>
            {!!loading && loadingComponent()
            }
            {!loading &&
                <GiftedChat
                    messages={messages}
                    onSend={handleSend}
                    user={{ _id: userInfo._id }}
                    placeholder='Type your message here...'
                    alwaysShowSend
                    showUserAvatar={false}
                    scrollToBottom
                    renderBubble={renderBubble}
                    renderMessage={renderMessage}
                    renderAvatar={renderAvatar}
                    // renderLoadEarlier={true}
                    // renderAvatar={null}
                    renderSend={renderSend}
                    renderTime={renderTime}
                    renderMessage={renderMessage}
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
            }
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
        // height: 40,
        alignItems: 'center',
        paddingLeft: 20,
        paddingVertical: 10,
        // marginTop: 20,
        borderBottomColor: "#eeeeee",
        borderBottomWidth: 1
    },
    loadingBar: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
});
