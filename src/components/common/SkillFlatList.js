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

const SkillFlatList = props => {
  const { labelColor, buttonColor } = random_rgba();
  const renderItem = ({ item }) => (
    <View style={styles.cardStyle}>
      <Image
        source={require('../../assets/img/skill.jpeg')}
        style={{ height: 100, width: 165 }}
      />
      <Text style={styles.skillName} numberOfLines={2}>
        Complete React native basics and redux concepts
      </Text>
      <Text style={styles.teacherName} numberOfLines={1}>
        Raju thota
      </Text>
      <View>
        <Rating
          type="star"
          imageSize={16}
          startingValue={4}
          style={{ marginTop: 5, marginLeft: -90 }}
        />
      </View>
      <View style={{ marginTop: 7, width: 110 }}>
        <Price />
      </View>
      {/* <Text style={styles.teacherName} numberOfLines={1}>
        $500 | $50 / head
      </Text> */}
      <View style={styles.platform}>
        <Button
          mode="contained"
          disabled
          uppercase={false}
          style={{ backgroundColor: buttonColor }}
          labelStyle={{ color: labelColor, fontSize: 12 }}>
          Skype
        </Button>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={props.categories}
        renderItem={renderItem}
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
  },
  cardStyle: {
    width: 170,
  },
});

export default SkillFlatList;
