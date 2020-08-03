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

const SkillDetail = ({ route, navigation }) => {
  const { title } = route.params;
  return (
    <View style={styles.container}>
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
      <ScrollView
        style={styles.skillDetailView}>
        <Text style={styles.skillName}>
          React native skills for beginers sadsd asdasdsd asdasda sdasd
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    padding: 20,
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
});

export default SkillDetail;
