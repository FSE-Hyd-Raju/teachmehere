import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import { Icon, Rating } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { random_rgba } from '../../utils/random_rgba';
import Price from '../common/Price';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import CourseCard from './coursecard';

const { labelColor, buttonColor } = random_rgba();

export default function SkillFlatList(props) {
  const navigation = useNavigation();

  const showDetails = skill => {
    navigation.navigate('SkillDetail', {
      skill: skill,
    });
  };

  const renderItemCopy = ({ item }) => {
    var categoryImage = (props.categories.filter(cat => cat.category == item.category))
    return (
      <TouchableOpacity
        style={styles.cardStyle}
        onPress={() => showDetails(item)}>
        <Image
          source={categoryImage && categoryImage.length ? { uri: categoryImage[0].illustration } : require('../../assets/img/skill.jpeg')}
          style={{ height: 95, width: 160 }}
        />
        <Text style={styles.skillName} numberOfLines={2}>
          {item.coursename}
        </Text>
        <Text style={styles.teacherName} numberOfLines={1}>
          {item.username}
        </Text>
        <View>
          <Rating
            type="star"
            imageSize={16}
            startingValue={4}
            readonly
            style={{ marginTop: 5, marginLeft: -90 }}
          />
        </View>
        <View style={{ marginTop: 7, width: 110 }}>
          <Price price={item.price} />
        </View>
        <View style={styles.platform}>
          <Text style={styles.platformText}>{item.platform}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={{ width: 300 }}
        onPress={() => showDetails(item)}>
        <CourseCard course={item} courseClicked={() => showDetails(item)} wishlistClicked={() => showDetails(item)} />
      </TouchableOpacity>
    )
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={props.skills}
        renderItem={({ item }) => renderItem(item)}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginVertical: 5,
  },
  skillName: {
    fontWeight: 'bold',
    color: '#444',
    fontSize: 16,
    marginTop: 7,
  },
  teacherName: {
    marginTop: 5,
    color: '#444',
    textTransform: 'capitalize',
  },
  platform: {
    marginTop: 8,
    width: 90,
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: 3,
    borderRadius: 2,
  },
  platformText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: "black",
  },
  cardStyle: {
    width: 170,
  },
});


