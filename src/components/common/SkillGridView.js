import React from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions } from 'react-native';

const SkillGridView = props => {
  return (
    <View style={styles.container}>
      <Text>SKILL LISST VIEW</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 13,
  },
  logo: {
    height: 50,
  },
  cardStyle: {
    padding: 16,
    backgroundColor: 'lightblue',
    height: 150,
    borderRadius: 8,
    width: Dimensions.get('screen').width / 3.5,
    elevation: 5,
    alignItems: 'center',
    paddingVertical: 60,
  },
});

export default SkillGridView;
