import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Button, Text } from 'react-native';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import moment from 'moment';
import messaging from "@react-native-firebase/messaging";
import PushNotification from 'react-native-push-notification';
import { useDispatch, useSelector } from 'react-redux'
import { loginSelector } from '../../../redux/slices/loginSlice'

export default function Chat() {

  const dispatch = useDispatch()
  const { userInfo } = useSelector(loginSelector)

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
    unsubscribe = getChats()
    notificationListener();
    notificunsubscribe = appOpenedNotificationListener()
    // return () => unsubscribe();

  }, []);



  const getChats = () => {
    return firestore()
      .collection('THREADS')
      .where("ids", "array-contains", userInfo._id)
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          res = querySnapshot.docs.map(documentSnapshot => {
            senderDetails = documentSnapshot.data().userDetails.find(o => o.id != userInfo._id);
            return {
              _id: documentSnapshot.id,
              name: (senderDetails && senderDetails.name) ? senderDetails.name : "",
              latestMessage: {
                text: ''
              },
              ...documentSnapshot.data()
            };
          });
          setThreads(res);
        }
        setLoading(false);
      });
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

  return (
    <View style={styles.container}>

      {/* <Button title="Update Profile" onPress={() => navigation.navigate('Update Profile')} /> */}

      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Room', { thread: item })}
          >
            <List.Item
              title={item.name}
              description={item.latestMessage.text}
              left={props => <List.Icon  {...props} style={{ fontSize: 30 }} icon="account-circle-outline" />}
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
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  }
});
