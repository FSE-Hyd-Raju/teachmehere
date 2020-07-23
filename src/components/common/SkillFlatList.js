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

const { labelColor, buttonColor } = random_rgba();
const SkillFlatList = props => {
  const renderItem = ({ item }) => (
    <View style={styles.cardStyle}>
      <Image
        source={require('../../assets/img/skill.jpeg')}
        style={{ height: 95, width: 160 }}
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
          readonly
          style={{ marginTop: 5, marginLeft: -90 }}
        />
      </View>
      <View style={{ marginTop: 7, width: 110 }}>
        <Price />
      </View>
      <View style={styles.platform}>
        {/* <Button
          mode="contained"
          disabled
          uppercase={false}
          style={{ backgroundColor: buttonColor }}
          labelStyle={{ color: labelColor, fontSize: 7 }}>
          Skype
        </Button> */}
        <Text style={styles.platformText}>Skype</Text>
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
  cardStyle: {
    width: 170,
  },
});

export default SkillFlatList;
