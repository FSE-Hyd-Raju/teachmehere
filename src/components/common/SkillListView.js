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
import Price from './Price';
import { random_rgba } from '../../utils/random_rgba';
import { Divider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CategoryChipView from './CategoryChipView';

const { labelColor, buttonColor } = random_rgba();

const SkillListView = ({ route, navigation }) => {
  const { title, category, skills } = route.params;
  const showDetails = skill => {
    navigation.navigate('SkillDetail', {
      title: '',
      skill,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header}>
          <Icons
            name={'keyboard-backspace'}
            size={27}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <Icons
          name={'filter'}
          size={27}
          // onPress={() => props.navigation.goBack()}
        />
      </View>
      <ScrollView
        style={{
          padding: 5,
        }}>
        {category && (
          <View>
            <Text style={{ padding: 10, fontSize: 15, fontWeight: 'bold' }}>
              Sub Categories
            </Text>
            <CategoryChipView data={category.subCategories} keyProp={'name'} />
          </View>
        )}
        {skills &&
          skills.map(skill => {
            return (
              <>
                <TouchableOpacity
                  style={styles.listview}
                  onPress={() => showDetails(skill)}>
                  <Image
                    source={require('../../assets/img/skill.jpeg')}
                    style={{ height: 80, width: 80, borderRadius: 7 }}
                  />
                  <View style={{ marginLeft: 25 }}>
                    <Text style={styles.skillName} numberOfLines={2}>
                      {skill.coursename}
                    </Text>
                    <Text style={styles.teacherName} numberOfLines={2}>
                      {skill.username}
                    </Text>
                    <Rating
                      type="star"
                      imageSize={16}
                      startingValue={4}
                      readonly
                      style={{ marginTop: 5, marginLeft: -40 }}
                    />
                    <View style={{ marginTop: 7, width: 110 }}>
                      <Price price={skill.price} />
                    </View>
                    <View style={styles.platform}>
                      <Text style={styles.platformText}>{skill.platform}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <Divider style={{ backgroundColor: 'gray' }} />
              </>
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 13,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'gray',
  },
  listview: {
    flexDirection: 'row',
    paddingBottom: 20,
    marginTop: 20,
  },
  skillName: {
    fontWeight: 'bold',
    color: '#444',
    fontSize: 20,
  },
  teacherName: {
    marginTop: 5,
    color: '#444',
    textTransform: 'capitalize',
  },
  platform: {
    marginTop: 10,
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
});

export default SkillListView;
