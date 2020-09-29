import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  Image,
  Share,
} from 'react-native';
import { Icon, Rating } from 'react-native-elements';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Price from './common/Price';
import { Card, ListItem } from 'react-native-elements';
import { Button, Avatar, Snackbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import globalStyles from '../screens/tabs/post/steps/styles';
import { random_rgba } from '../utils/random_rgba';
import { useDispatch, useSelector } from 'react-redux';
import { setLocale } from 'yup';
import { homeSelector } from '../redux/slices/homeSlice';
import { loginSelector } from '../redux/slices/loginSlice';
import {
  profileSelector,
  setRequestedSkills,
} from '../redux/slices/profileSlice';
import PageSpinner from '../components/common/PageSpinner';
import firestore from '@react-native-firebase/firestore';
import { DataTable } from 'react-native-paper';
import moment from 'moment';

const { labelColor, buttonColor } = random_rgba();

export default function SkillDetail({ route, navigation }) {
  const { skill } = route.params;
  const { homeData } = useSelector(homeSelector);
  const { userInfo } = useSelector(loginSelector);
  const { requestedSkills } = useSelector(profileSelector);
  const [visibleSnackbar, setVisibleSnackbar] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [requestedObj, setRequestedObj] = React.useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      userInfo._id
      // && (!requestedSkills || !requestedSkills.length)
    ) {
      getRequetedCourses(userInfo._id);
    }
    // else if (userInfo._id) {
    //   let reqObj = requestedSkills.filter(obj => obj.request_uid == userInfo._id)
    //   if (reqObj.length) setRequestedObj(reqObj[0])
    // }
  }, [userInfo]);

  const getRequetedCourses = uid => {
    setLoading(true);
    fetch('https://teachmeproject.herokuapp.com/requestedCoursesByid', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
        if (responseJson && responseJson.length)
          dispatch(setRequestedSkills(responseJson));
        let reqObj = responseJson.filter(
          obj => obj.request_uid == userInfo._id,
        );
        if (reqObj.length) setRequestedObj(reqObj[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const snackComponent = () => {
    return (
      <Snackbar
        visible={!!visibleSnackbar}
        onDismiss={() => setVisibleSnackbar('')}
        duration={2000}
        action={{
          label: 'Dismiss',
          onPress: () => {
            setVisibleSnackbar('');
          },
        }}
        style={{ backgroundColor: 'white' }}
        wrapperStyle={{ backgroundColor: 'white' }}>
        <Text style={{ color: 'black', fontSize: 16, letterSpacing: 1 }}>
          {visibleSnackbar}
        </Text>
      </Snackbar>
    );
  };

  const headerComponent = () => {
    var categoryImage = homeData.categories.filter(
      cat => cat.category == skill.category,
    );

    const onShare = async () => {
      try {
        const result = await Share.share({
          title: 'Skill On',
          message:
            'Found a good course about ' +
            skill.coursename +
            ' for just ' +
            skill.currency +
            skill.price.oneonone +
            ' in SkillOn App, Check it out! AppLink :https://play.google.com/store/apps/details?id=com.TAGIdeas.BMB',
          url: 'https://play.google.com/store/apps/details?id=com.TAGIdeas.BMB',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    return (
      <View>
        <Image
          source={
            categoryImage && categoryImage.length
              ? { uri: categoryImage[0].illustration }
              : require('../assets/img/skill.jpeg')
          }
          style={styles.imgStyle}
        />
        <View style={styles.header}>
          <Icons
            name={'keyboard-backspace'}
            size={27}
            color={'white'}
            style={{ fontWeight: 'bold' }}
            onPress={() => navigation.goBack()}
          />
          <MaterialCommunityIcons
            name="share-variant"
            size={26}
            color={'white'}
            onPress={() => onShare()}
          />
        </View>
      </View>
    );
  };

  const imageComponent = () => {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <Avatar.Image
            size={130}
            style={{ marginTop: -80, elevation: 10 }}
            source={
              skill.displaypic
                ? { uri: skill.displaypic }
                : require('../assets/img/default-mask-avatar.png')
            }
            // source={require('../assets/img/defaultAvatar.png')}
          />
          <Text
            style={{
              marginTop: 10,
              color: '#444',
              fontWeight: 'bold',
              fontSize: 16,
              textTransform: 'capitalize',
            }}>
            {skill.username}
          </Text>
          {/* <View style={{ flexDirection: 'row', padding: 3 }}>
            <MaterialCommunityIcons name="account-outline" size={17} />
            <Text style={{ marginLeft: 5 }}>91 students</Text>
          </View>
          <View style={{ flexDirection: 'row', padding: 3 }}>
            <MaterialCommunityIcons name="book-outline" size={17} />
            <Text style={{ marginLeft: 5 }}>11 skills</Text>
          </View> */}
          <View style={{ marginLeft: 90, flexDirection: 'row' }}>
            <Rating
              type="star"
              imageSize={15}
              startingValue={skill.avgrating}
              readonly
              style={{ marginTop: 5, marginLeft: -90 }}
            />
            <Text style={styles.usersRated}>({skill.usersrated})</Text>
          </View>
          <Button
            mode="text"
            color={'#0052cc'}
            labelStyle={{ fontSize: 14, textTransform: 'capitalize' }}
            onPress={() =>
              navigation.navigate('UserDetailsPage', { userinfo: skill })
            }>
            View profile
          </Button>
        </View>
        <MaterialCommunityIcons
          style={{ marginLeft: '88%', position: 'absolute', padding: 10 }}
          name="heart"
          size={26}
        />
      </View>
    );
  };

  const getSpeakingLanguages = lang => {
    return lang.join('');
  };

  const dataTableComponent = () => {
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Other Info</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>Skill Level</DataTable.Cell>
          <DataTable.Cell>{skill.courselevel}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Speaking Languages</DataTable.Cell>
          <DataTable.Cell>
            {skill.speakinglanguages.length > 0
              ? getSpeakingLanguages(skill.speakinglanguages)
              : ''}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Platform</DataTable.Cell>
          <DataTable.Cell>{skill.platform}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Country</DataTable.Cell>
          <DataTable.Cell>{skill.country}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Demo available ?</DataTable.Cell>
          <DataTable.Cell>{skill.demo ? 'Yes' : 'No'}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Posted</DataTable.Cell>
          <DataTable.Cell>{moment(skill.createddate).fromNow()}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row />
      </DataTable>
    );
  };

  const bodyComponent = () => {
    return (
      <View>
        <Text style={styles.skillName}>{skill.coursename}</Text>
        <View style={{ width: '40%', padding: 20, paddingTop: 0 }}>
          <Price price={skill.price} currency={skill.currency} />
        </View>
        <View style={[globalStyles.platform, { marginLeft: 15 }]}>
          <Text style={globalStyles.platformText}>
            Duration: {skill.totalhours}
          </Text>
        </View>
        {dataTableComponent()}
      </View>
    );
  };

  const contentComponent = () => {
    return (
      <View style={[styles.shadowBottonContainerStyle, { marginTop: 20 }]}>
        <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>
          What will you learn ?
        </Text>
        <View style={styles.container}>
          {!!skill.content && !!skill.content.length && (
            <FlatList
              data={skill.content}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row' }}>
                  <MaterialCommunityIcons
                    name="check"
                    size={16}
                    style={{ padding: 7 }}
                  />
                  <Text style={styles.item}>{item}</Text>
                </View>
              )}
            />
          )}
          {!skill.content && !skill.content.length && (
            <Text style={{ padding: 20, fontSize: 15 }}>
              Contents not mentioned
            </Text>
          )}
        </View>
      </View>
    );
  };

  const descriptionComponent = () => {
    return (
      <View style={[styles.shadowBottonContainerStyle, { marginTop: 20 }]}>
        <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>
          Description
        </Text>
        {!!skill.description && (
          <Text style={{ padding: 10 }}>{skill.description}</Text>
        )}
        {!skill.description && (
          <Text style={{ padding: 20, fontSize: 15 }}>
            Description not mentioned
          </Text>
        )}
      </View>
    );
  };

  const requestButtonComponent = () => {
    const requestBtn = () => {
      if (!userInfo._id) {
        setVisibleSnackbar('Please login!');
      } else {
        sendRequest(skill);
      }
    };

    const sendRequest = skill => {
      setLoading(true);
      fetch('https://teachmeproject.herokuapp.com/addToRequestedCourses', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: userInfo._id,
          courseid: skill._id,
          courseuid: skill.uid,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          getRequetedCourses(userInfo._id);
          addFirebaseNotification(skill);
        })
        .catch(error => {
          setVisibleSnackbar('Something went wrong!');
          console.error(error);
          setLoading(false);
        });
    };

    const addFirebaseNotification = skill => {
      const notifyobj = {
        senderName: userInfo.username,
        senderId: userInfo._id,
        receiverName: skill.username,
        receiverId: skill.uid,
        request_status: 'PENDING',
        type: 'REQUEST',
        createdAt: new Date().getTime(),
        message: 'Lets be friends..!',
        courseid: skill._id,
      };

      firestore()
        .collection('NOTIFICATIONS')
        .add(notifyobj)
        .then(
          docRef => {
            sendNotification(skill, notifyobj);
          },
          err => {
            setVisibleSnackbar('Something went wrong!');
            console.error(error);
            setLoading(false);
          },
        );
    };

    const sendNotification = (skill, notifyobj) => {
      fetch('https://teachmeproject.herokuapp.com/sendChatNotification', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userInfo.username,
          message: notifyobj.message,
          _id: skill.uid,
          data: notifyobj,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          setVisibleSnackbar('Request sent to the user!');
          setLoading(false);
        })
        .catch(error => {
          setVisibleSnackbar('Something went wrong!');
          console.error(error);
          setLoading(false);
        });
    };

    const checkIfChatExists = () => {
      setLoading(true);
      var exists = false;
      firestore()
        .collection('THREADS')
        .where('ids', 'array-contains', userInfo._id)
        .get()
        .then(querySnapshot => {
          var itemObj = {};
          querySnapshot.forEach(documentSnapshot => {
            var data = documentSnapshot.data();
            if (data['ids'].indexOf(skill.uid) > -1) {
              exists = true;

              var messageObj = {
                // id: ref.id,
                userDetails: [
                  {
                    id: userInfo._id,
                    name: userInfo.username,
                    displaypic: userInfo.displaypic,
                  },
                  {
                    id: skill.uid,
                    name: skill.username,
                    displaypic: skill.displaypic,
                  },
                ],
                ids: [userInfo._id, skill.uid],
                latestMessage: {
                  text: 'Say Hello..',
                  createdAt: Date.now(),
                },
                deletedIds: [skill.uid],
                newChat: true,
              };

              itemObj = {
                // ...item,
                ...messageObj,
                _id: documentSnapshot.id,
                name: skill.username,
                displaypic: skill.displaypic,
                senderDetailsId: skill.uid,
              };

              // item = {
              //   ...item,
              //   _id: documentSnapshot.id,
              //   name: item.username,
              // };
            }
          });
          if (!exists) {
            sendMessage();
          } else {
            console.log('elseeeeeeeeeeeeeeeeeeeeeee');
            console.log(itemObj);
            setLoading(false);
            navigation.navigate('ChatRoom', { thread: itemObj });
          }
        });
    };

    function sendMessage() {
      const ref = firestore()
        .collection('THREADS')
        .doc();

      var messageObj = {
        // id: ref.id,
        userDetails: [
          {
            id: userInfo._id,
            name: userInfo.username,
            displaypic: userInfo.displaypic,
          },
          {
            id: skill.uid,
            name: skill.username,
            displaypic: skill.displaypic,
          },
        ],
        ids: [userInfo._id, skill.uid],
        latestMessage: {
          text: 'Say Hello..',
          createdAt: Date.now(),
        },
        deletedIds: [skill.uid],
        newChat: true,
      };
      ref.set(messageObj).then(() => {
        // ref.get().then(doc => {
        //    alert(JSON.stringify(doc.data()))
        // })
        ref
          .collection('MESSAGES')
          .add({
            text: 'Say Hello..',
            createdAt: Date.now(),
            system: true,
          })
          .then(() => {});
      });

      var itemObj = {
        // ...item,
        ...messageObj,
        _id: ref.id,
        name: skill.username,
        displaypic: skill.displaypic,
        senderDetailsId: skill.uid,
      };
      // navigation.popToTop();
      setLoading(false);
      navigation.navigate('ChatRoom', { thread: itemObj });
    }

    return (
      <View>
        {/* <View style={globalStyles.btnStyle}> */}
        {/* <Text>{JSON.stringify(requestedObj)}</Text> */}
        {!requestedObj.request_status && (
          <Button
            mode="contained"
            color={'black'}
            labelStyle={globalStyles.btnLabelStyle}
            onPress={requestBtn}>
            {' '}
            Request
          </Button>
        )}
        {(requestedObj.request_status == 'REJECTED' ||
          requestedObj.request_status == 'PENDING') && (
          <Button
            disabled={true}
            mode="contained"
            color={'black'}
            labelStyle={globalStyles.btnLabelStyle}>
            {requestedObj.request_status}
          </Button>
        )}
        {requestedObj.request_status == 'ACCEPTED' && (
          <Button
            mode="contained"
            color={'black'}
            labelStyle={globalStyles.btnLabelStyle}
            onPress={checkIfChatExists}>
            Message
          </Button>
        )}
        {/* </View> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {headerComponent()}
        <View style={styles.skillDetailView}>
          {imageComponent()}
          {bodyComponent()}
          {!requestedObj ||
            !userInfo ||
            (requestedObj &&
              userInfo &&
              requestedObj.courseuid != userInfo._id &&
              requestButtonComponent())}
          {contentComponent()}
          {descriptionComponent()}
        </View>
        <PageSpinner visible={loading} />
      </ScrollView>
      {snackComponent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 5,
    fontSize: 17,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    padding: 20,
  },
  platform: {
    marginTop: 8,
    marginBottom: 20,
    width: 90,
    backgroundColor: 'rgba(243, 246, 252, 0.7)',
    borderColor: 'lightgrey',
    borderWidth: 0.3,
    padding: 3,
    borderRadius: 2,
  },
  platformText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'gray',
  },
  imgStyle: {
    height: 200,
    // width: '100%',
    // opacity: 0.7,
  },
  skillName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#008080',
    padding: 20,
    textTransform: 'capitalize',
  },
  skillLevel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#696969',
    marginLeft: 20,
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  usersRated: {
    fontSize: 12,
    color: '#444',
    padding: 3,
    marginTop: 1,
  },
  skillDetailView: {
    padding: 15,
    width: '100%',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    elevation: 10,
    marginTop: -40,
    backgroundColor: 'white',
  },
  shadowBottonContainerStyle: {
    //<--- Style without elevation
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
});
