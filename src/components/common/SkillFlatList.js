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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import CourseCard from './coursecard';


export default function SkillFlatList(props) {
  const navigation = useNavigation();

  const showDetails = skill => {
    navigation.navigate('SkillDetail', {
      skill: skill,
    });
  };

  const renderItem = item => {
    return (
      <TouchableOpacity onPress={() => showDetails(item)}>
        <CourseCard
          course={item}
          courseClicked={() => showDetails(item)}
          wishlistClicked={() => showDetails(item)}
          cardWidth={220}
        />
      </TouchableOpacity>
    );
  };

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginVertical: 5,
  },
});
