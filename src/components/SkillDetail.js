import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  Image,
  Share
} from 'react-native';
import { Icon, Rating } from 'react-native-elements';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Price from './common/Price';
import { Card, ListItem } from 'react-native-elements';
import { Button, Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import globalStyles from '../screens/tabs/post/steps/styles';
import { random_rgba } from '../utils/random_rgba';
import { useDispatch, useSelector } from 'react-redux';
import { setLocale } from 'yup';
import { homeSelector } from '../redux/slices/homeSlice';

const { labelColor, buttonColor } = random_rgba();


export default function SkillDetail({ route, navigation }) {
  const { skill } = route.params;
  const { homeData } = useSelector(homeSelector);


  const headerComponent = () => {
    var categoryImage = (homeData.categories.filter(cat => cat.category == skill.category));

    const onShare = async () => {
      try {
        const result = await Share.share({
          title: 'Skill On',
          message: 'Found a good course about ' + skill.coursename + ' for just ' + skill.currency + skill.price.oneonone + ' in SkillOn App, Check it out! AppLink :https://play.google.com/store/apps/details?id=com.TAGIdeas.BMB',
          url: 'https://play.google.com/store/apps/details?id=com.TAGIdeas.BMB'
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
          // source={require('../assets/img/skill.jpeg')}
          source={categoryImage && categoryImage.length ? { uri: categoryImage[0].illustration } : require('../assets/img/skill.jpeg')}
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
    )
  }

  const imageComponent = () => {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <Avatar.Image
            size={150}
            style={{ marginTop: -80, elevation: 10 }}
            source={skill.displaypic ? { uri: skill.displaypic } : require('../assets/img/default-mask-avatar.png')}
          // source={require('../assets/img/defaultAvatar.png')}
          />
          <Text style={{ marginTop: 10, color: '#444', fontWeight: 'bold', fontSize: 16, textTransform: 'capitalize' }}>
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
          <View style={{ marginLeft: 90 }}>
            <Rating
              type="star"
              imageSize={15}
              startingValue={skill.avgrating}
              readonly
              style={{ marginTop: 5, marginLeft: -90 }}
            />
          </View>
          <Button
            mode="text"
            color={'#0052cc'}
            labelStyle={{ fontSize: 14, textTransform: 'capitalize' }}
            onPress={() => navigation.navigate("UserDetailsPage", { userinfo: skill })}>
            View profile
          </Button>
        </View>
        {/* <MaterialCommunityIcons
          style={{ marginLeft: '88%', position: 'absolute', padding: 10 }}
          name="heart"
          size={26}
        /> */}
      </View>
    )
  }

  const bodyComponent = () => {
    return (
      <View>
        <Text style={styles.skillName}>{skill.coursename}</Text>
        <View style={{ width: '40%', padding: 20, paddingTop: 0 }}>
          <Price price={skill.price} currency={skill.currency} />
        </View>
        <View style={styles.platform}>
          <Text style={styles.platformText}>{skill.platform}</Text>
        </View>
      </View>
    )
  }

  const contentComponent = () => {
    return (
      <View style={[styles.shadowBottonContainerStyle, { marginTop: 20 }]}>
        <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>
          What will you learn ?
          </Text>
        <View style={styles.container}>
          {!!skill.content && !!skill.content.length && <FlatList
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
          />}
          {!skill.content && !skill.content.length && <Text style={{ padding: 20, fontSize: 15 }}>Contents not mentioned</Text>}
        </View>
      </View>
    )
  }

  const descriptionComponent = () => {
    return (
      <View style={[styles.shadowBottonContainerStyle, { marginTop: 20 }]}>
        <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>
          Description
      </Text>
        {!!skill.description && <Text style={{ padding: 10 }}>
          {skill.description}
        </Text>
        }
        {!skill.description && <Text style={{ padding: 20, fontSize: 15 }}>
          Description not mentioned</Text>}
      </View>
    )
  }

  const requestButtonComponent = () => {
    const requestBtn = () => {

    }
    return (
      <View>
        <TouchableOpacity style={globalStyles.btnStyle}>
          <Button
            mode="contained"
            color={'black'}
            labelStyle={globalStyles.btnLabelStyle}
            onPress={requestBtn}
          >
            Request
        </Button>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {headerComponent()}
      <View style={styles.skillDetailView}>
        {imageComponent()}
        {bodyComponent()}
        {requestButtonComponent()}
        {contentComponent()}
        {descriptionComponent()}
      </View>
    </ScrollView>
  );
};

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
    backgroundColor: "rgba(243, 246, 252, 0.7)",
    borderColor: "lightgrey",
    borderWidth: 0.3,
    padding: 3,
    borderRadius: 2,
  },
  platformText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: "black",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'gray',
  },
  imgStyle: {
    height: 340,
    // width: '100%',
    // opacity: 0.7,
  },
  skillName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#444',
    padding: 20,
    // marginTop: 20,
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


