import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  Image,
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
import { setLocale } from 'yup';

const { labelColor, buttonColor } = random_rgba();
const SkillDetail = ({ route, navigation }) => {
  const { title, skill } = route.params || {};
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/img/skill.jpeg')}
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
        />
      </View>
      <View style={styles.skillDetailView}>
        <View style={{ alignItems: 'center' }}>
          <Avatar.Image
            size={150}
            style={{ marginTop: -80, elevation: 10 }}
            source={require('../assets/img/defaultAvatar.png')}
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
          <View style={{ flexDirection: 'row', padding: 3 }}>
            <MaterialCommunityIcons name="account-outline" size={17} />
            <Text style={{ marginLeft: 5 }}>91 students</Text>
          </View>
          <View style={{ flexDirection: 'row', padding: 3 }}>
            <MaterialCommunityIcons name="book-outline" size={17} />
            <Text style={{ marginLeft: 5 }}>11 skills</Text>
          </View>
          <View style={{ marginLeft: 90 }}>
            <Rating
              type="star"
              imageSize={15}
              startingValue={4}
              readonly
              style={{ marginTop: 5, marginLeft: -90 }}
            />
          </View>
          <Button
            mode="text"
            color={'#0052cc'}
            labelStyle={{ fontSize: 14, textTransform: 'capitalize' }}
            onPress={() => console.log('Pressed')}>
            View profile
          </Button>
        </View>
        <MaterialCommunityIcons
          style={{ marginLeft: '88%', position: 'absolute', padding: 10 }}
          name="heart"
          size={26}
        />
        <Text style={styles.skillName}>{skill.coursename}</Text>
        <View style={{ width: '40%', padding: 20 }}>
          <Price price={skill.price} />
        </View>
        <View style={styles.platform}>
          <Text style={styles.platformText}>{skill.platform}</Text>
        </View>
        <View>
          <TouchableOpacity style={globalStyles.btnStyle}>
            <Button
              mode="contained"
              color={'black'}
              labelStyle={globalStyles.btnLabelStyle}
              //onPress={formProps.handleSubmit}
            >
              Request
            </Button>
          </TouchableOpacity>
        </View>
        <View style={[styles.shadowBottonContainerStyle, { marginTop: 20 }]}>
          <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>
            What will you learn ?
          </Text>
          <View style={styles.container}>
            <FlatList
              data={[
                { key: 'Devin ghgjh jhjhbhj jhb' },
                { key: 'Dan cvbngf ggfhj' },
                { key: 'Dominic gfhgfh hghg' },
                { key: 'Jackson jhgjhg hghjgj jhgjh' },
                { key: 'Jameshgbjhbjmnbj jhjhbh' },
              ]}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row' }}>
                  <MaterialCommunityIcons
                    name="check"
                    size={16}
                    style={{ padding: 7 }}
                  />
                  <Text style={styles.item}>{item.key}</Text>
                </View>
              )}
            />
          </View>
        </View>
        <View style={[styles.shadowBottonContainerStyle, { marginTop: 20 }]}>
          <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>
            Description
          </Text>
          <Text style={{ padding: 10 }}>
            Use whenever building standard forms where there's enough space for
            labels and other associated information in the view. Form groups
            ensure correct spacing around form elements and can be arranged in
            various configurations.
          </Text>
        </View>
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
    backgroundColor: buttonColor,
    padding: 3,
    borderRadius: 2,
  },
  platformText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: labelColor,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'gray',
  },
  imgStyle: {
    height: 350,
    width: '100%',
    opacity: 0.7,
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

export default SkillDetail;
