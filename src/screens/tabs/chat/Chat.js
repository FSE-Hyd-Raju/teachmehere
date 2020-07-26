import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Button, Text } from 'react-native';
import { List, Divider, Searchbar, FAB } from 'react-native-paper';
import { Avatar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import messaging from "@react-native-firebase/messaging";
import PushNotification from 'react-native-push-notification';
import { useDispatch, useSelector } from 'react-redux'
import { loginSelector } from '../../../redux/slices/loginSlice';
import { chatSelector } from '../../../redux/slices/chatSlice';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';


export default function Chat({ navigation }) {

  const dispatch = useDispatch()
  const { userInfo } = useSelector(loginSelector)
  // const { chatResults, loading } = useSelector(chatSelector)
  const [threads, setThreads] = useState([]);
  const [homeloading, setLoading] = useState(true);
  // const { user } = useContext(AuthContext);
  // const { loading } = useContext(AuthContext);
  var focusNotiMsg = null
  var unsubscribe = null;
  var notificunsubscribe = null;


  useEffect(() => {
    unsubscribe && unsubscribe()
    notificunsubscribe && notificunsubscribe();
    getChats()
    notificationListener();
    notificunsubscribe = appOpenedNotificationListener()
    // return () => unsubscribe();

  }, []);

  const getChats = () => {
    // return dispatch(fetchChats(userInfo))
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
    const newData = orithreads.filter((ele) => (ele.name).toLowerCase().includes(query.toLowerCase()));
    setThreads(newData)
  }

  return (
    <View style={styles.container}>
      <Searchbar
        style={{ margin: 15, borderRadius: 18 }}
        inputStyle={{ fontSize: 13, justifyContent: "center", overflow: "hidden" }}
        placeholder="Search by name .."
        onChangeText={searchFun}
      />
      <FlatList
        data={threads}
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
      <FAB
        style={styles.fab}
        small
        icon={props => <AwesomeIcon {...props} name="pencil-square-o" />}
        color="black"
        onPress={() => navigation.navigate("NewChat")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
