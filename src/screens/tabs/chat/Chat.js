import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Button, Text, Image, Dimensions } from 'react-native';
import { List, Divider, Searchbar, FAB, ActivityIndicator, Colors } from 'react-native-paper';
import { Avatar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import messaging from "@react-native-firebase/messaging";
import PushNotification from 'react-native-push-notification';
import { useDispatch, useSelector } from 'react-redux'
import { loginSelector } from '../../../redux/slices/loginSlice';
import { chatSelector, fetchChats, setChatResults } from '../../../redux/slices/chatSlice';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';


export default function Chat({ navigation }) {

  const dispatch = useDispatch()
  const { userInfo } = useSelector(loginSelector)
  const { chatResults, searchChatResults, loading } = useSelector(chatSelector)
  var focusNotiMsg = null
  var unsubscribe = null;
  var notificunsubscribe = null;


  useEffect(() => {
    unsubscribe && unsubscribe()
    notificunsubscribe && notificunsubscribe();
    if (userInfo._id)
      unsubscribe = getChats()
    notificationListener();
    notificunsubscribe = appOpenedNotificationListener()
    // return () => unsubscribe();

  }, []);

  const getChats = () => {
    return dispatch(fetchChats(userInfo))
  }

  const notificationListener = async () => {
    PushNotification.configure({
      onNotification: function (notification) {
        if (focusNotiMsg && focusNotiMsg.data && focusNotiMsg.data.data && JSON.parse(focusNotiMsg.data.data).type == "CHAT") {
          navigation.push('Room', { thread: JSON.parse(focusNotiMsg.data.data) });
        }
        else if (notification && notification.data && notification.data.type == "CHAT") {
          navigation.push('Room', { thread: notification.data });
        }
        else {
          navigation.push('NotificationRoom');
        }
      },
      popInitialNotification: true,
      requestPermissions: true
    })
  }

  appOpenedNotificationListener = () => {
    return messaging().onMessage(async remoteMessage => {
      focusNotiMsg = remoteMessage;
      PushNotification.localNotification({
        // largeIcon: "ic_foreground",
        smallIcon: "ic_foreground",
        autoCancel: true,
        bigText: remoteMessage.data.body,
        // subText: remoteMessage.data.body,
        title: remoteMessage.data.title,
        message: remoteMessage.data.body,
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
      })

      // alert('A new FCM message arrived!' + JSON.stringify(remoteMessage));
    });
  }

  const searchFun = (query) => {
    const newData = chatResults.filter((ele) => (ele.name).toLowerCase().includes(query.toLowerCase()));
    dispatch(setChatResults(newData))
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
      <Searchbar
        style={{ margin: 15, borderRadius: 18 }}
        inputStyle={{ fontSize: 13, justifyContent: "center", overflow: "hidden" }}
        placeholder="Search by name..."
        onChangeText={searchFun}
      />

      {!!loading &&
        loadingComponent()
      }
      {!loading && !!searchChatResults.length &&
        <View>


          <FlatList
            data={searchChatResults}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ChatRoom', { thread: item })}
              >
                <List.Item
                  title={item.name}
                  description={item.latestMessage.text}
                  left={props => <Avatar
                    rounded
                    containerStyle={{ margin: 7 }}
                    size={50}
                    source={require('../../../assets/img/default-mask-avatar.png')}
                  />}
                  right={props => <Text style={styles.datetime}>{moment(item.latestMessage.createdAt).fromNow()} </Text>}
                  titleNumberOfLines={1}
                  titleStyle={styles.listTitle}
                  descriptionStyle={styles.listDescription}
                  descriptionNumberOfLines={1}

                />
              </TouchableOpacity>
            )}
          />
        </View>
      }
      {!loading && !searchChatResults.length &&
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Image
            // width={Dimensions.get('window').width}
            //     resizeMode={"center"}
            style={styles.backgroundImage}
            source={require('../../../assets/img/charfromhome.png')}
          />
          <Text style={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: "center",
            fontSize: 20,
            color: "#105883",
          }}>
            You have no chats!
            </Text>
          <Text style={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: "center",
            margin: 10,
            color: "grey",
            fontSize: 15
          }}>
            Search for skills you like, send them requests and chat with them.
          </Text>
        </View>
      }
      {!loading &&
        <FAB
          style={styles.fab}
          // small
          icon={props => <AwesomeIcon {...props} name="pencil-square-o" />}
          color="black"
          onPress={() => navigation.navigate("NewChat")}
        />
      }
    </View>
  );
}

const win = Dimensions.get('window');
const ratio = win.width / 4000;
const styles = StyleSheet.create({
  loadingBar: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 100
  },
  backgroundImage: {
    // width: 360,
    // height: 275,
    // flex: 1,
    width: 200,
    height: 200, //362 is actual height of image
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
  },
  icon: {
    fontSize: 20
  },
  datetime: {
    marginTop: 20
  },
  listTitle: {
    fontSize: 20
  },
  listDescription: {
    fontSize: 13
  }
});
