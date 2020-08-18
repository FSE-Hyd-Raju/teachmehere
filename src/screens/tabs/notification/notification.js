// import React, { useState, useContext, useEffect } from 'react';
// import { ActivityIndicator, View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
// import { IconButton, List, Divider, Button } from 'react-native-paper';
// import { AuthContext } from '../navigation/AuthProvider';
// import firestore from '@react-native-firebase/firestore';
// import useStatsBar from '../utils/useStatusBar';
// import moment from 'moment';
// import Loading from '../components/Loading';


// export default function NotificationRoomScreen({ navigation }) {
//     useStatsBar('light-content');

//     const [notifications, setNotifications] = useState([]);
//     const { user } = useContext(AuthContext);
//     const [loading, setLoading] = useState(true);

//     async function handleSend(messages) {
//         const text = messages[0].text;

//         firestore()
//             .collection('THREADS')
//             .doc(thread._id)
//             .collection('MESSAGES')
//             .add({
//                 text,
//                 createdAt: new Date().getTime(),
//                 user: {
//                     _id: user._id,
//                     email: user.email
//                 }
//             });

//         await firestore()
//             .collection('THREADS')
//             .doc(thread._id)
//             .set(
//                 {
//                     latestMessage: {
//                         text,
//                         createdAt: new Date().getTime()
//                     }
//                 },
//                 { merge: true }
//             );

//         // alert(JSON.stringify(thread.ids))
//         receiverId = thread.ids.filter(ele => ele != user._id)
//         fetch('https://teachmeproject.herokuapp.com/sendChatNotification', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 "username": user.username,
//                 "message": text,
//                 "_id": receiverId[0],
//                 "thread": thread
//             })

//         }).then((response) => response.json())
//             .then((responseJson) => {
//                 // Showing response message coming from server after inserting records.
//             }).catch((error) => {
//                 console.error(error);
//             });
//     }

//     useEffect(() => {
//         getNotifications()
//     }, []);


//     getNotifications = () => {
//         setLoading(true);
//         firestore()
//             .collection('NOTIFICATIONS')
//             .where(
//                 "receiverId", "==", user._id
//             ).get()
//             .then(snapshot => {
//                 notificationsArr = []
//                 snapshot.forEach(documentSnapshot => {
//                     const data = {
//                         _id: documentSnapshot.id,
//                         text: '',
//                         createdAt: new Date().getTime(),
//                         ...documentSnapshot.data()
//                     };

//                     notificationsArr.push(data)
//                 });
//                 setNotifications(notificationsArr);
//                 setLoading(false);
//             });
//     }

//     changestatus = async (item, status) => {
//         setLoading(true);
//         await firestore()
//             .collection('NOTIFICATIONS')
//             .doc(item._id)
//             .set(
//                 {
//                     status: status
//                 },
//                 { merge: true }
//             ).then(() => {
//                 updateRequestedCourse(item, status)
//             }, (error) => {
//                 console.error(error);
//                 setLoading(false);
//                 alert("something went wrong")
//             })
//     }

//     updateRequestedCourse = (item, status) => {
//         fetch('https://teachmeproject.herokuapp.com/updateStatus', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 "uid": item.senderId,
//                 "courseid": user._id,
//                 "status": status
//             })

//         }).then((response) => response.json())
//             .then((responseJson) => {
//                 sendNotification(item, status);
//             }).catch((error) => {
//                 console.error(error);
//                 setLoading(false);
//                 alert("something went wrong")
//             });
//     }

//     sendNotification = (item, status) => {

//         notifyobj = {
//             senderName: user.username,
//             senderId: user._id,
//             receiverName: item.senderName,
//             receiverId: item.senderId,
//             status: status,
//             type: "INFO",
//             createdAt: new Date().getTime(),
//             message: status == "ACCEPTED" ? "Accepted your request" : "Declined your request"
//             // _id: docRef._id,
//             // ids: [user._id, item._id],
//             // senderName: user.username,
//             // senderId: user._id,
//             // receiverName: item.senderName,
//             // receiverId: item.senderId,
//             // createdAt: new Date().getTime(),
//             // message: "accepted your request"
//         }

//         firestore().collection('NOTIFICATIONS').add(notifyobj).then(docRef => {
//             fetch('https://teachmeproject.herokuapp.com/sendChatNotification', {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     "username": user.username,
//                     "message": notifyobj.message,
//                     "_id": item.senderId,
//                     "thread": notifyobj
//                 })

//             }).then((response) => response.json())
//                 .then((responseJson) => {
//                     setLoading(false);
//                     navigation.goBack();
//                 }).catch((error) => {
//                     setLoading(false);
//                     console.error(error);
//                     alert("something went wrong")
//                 });
//         }, (error) => {
//             setLoading(false);
//             console.error(error);
//             alert("something went wrong")
//         });
//     }

//     if (loading) {
//         return <Loading />;
//     }

//     return (
//         <View style={styles.container}>
//             <IconButton
//                 icon='close-circle'
//                 size={36}
//                 color='#6646ee'
//                 onPress={() => navigation.goBack()}
//             />
//             {notifications && notifications.length && <FlatList
//                 data={notifications}
//                 keyExtractor={item => item._id}
//                 ItemSeparatorComponent={() => <Divider />}
//                 renderItem={({ item }) => (
//                     <View>
//                         {item.type != "REQUEST" && <List.Item
//                             title={item.senderName}
//                             description={item.message}
//                             left={props => <List.Icon  {...props} style={{ fontSize: 30 }} icon="bell" />}
//                             // titleNumberOfLines={1}
//                             titleStyle={styles.listTitle}
//                             descriptionStyle={styles.listDescription}
//                         // descriptionNumberOfLines={1}
//                         />
//                         }
//                         {item.type == "REQUEST" &&
//                             <List.Accordion
//                                 title={item.senderName}
//                                 description={item.message}
//                                 left={props => <List.Icon  {...props} style={{ fontSize: 30 }} icon="bell" />}
//                             >
//                                 <View style={styles.iconContainer}>
//                                     <Button disabled={item.status == "ACCEPTED"} icon="check-outline" mode="outlined" onPress={() => changestatus(item, "ACCEPTED")}>
//                                         Accept
//                                     </Button>
//                                     <Button disabled={item.status == "REJECTED"} icon="close-outline" mode="outlined" onPress={() => changestatus(item, "REJECTED")}>
//                                         Reject
//                                     </Button>
//                                 </View>

//                             </List.Accordion>
//                         }
//                     </View>

//                 )}
//             />
//             }
//             {!notifications || !notifications.length && <Text>No Notifications</Text>}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     icon: {
//         fontSize: 20
//     },
//     datetime: {
//         marginTop: 20
//     },
//     container: {
//         backgroundColor: '#f5f5f5',
//         flex: 1
//     },
//     listTitle: {
//         fontSize: 22
//     },
//     listDescription: {
//         fontSize: 16
//     },
//     iconContainer: {
//         flexDirection: "row",
//         justifyContent: "space-evenly",
//         width: 300
//     }
// });
