import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CategoryWrapper = props => {
  const { title, onButtonPress, btnText } = props;
  return (
    <View style={styles.topWrapper}>
      <Text style={styles.title} type="title2">
        {title}
      </Text>
      {/* <TouchableOpacity onPress={onButtonPress} style={{ padding: 10 }}>
        <Text style={styles.seeAll}>{btnText}</Text>
      </TouchableOpacity> */}
      <Button mode="text" color={'black'} onPress={onButtonPress}>
        {btnText}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginLeft: 16,
    marginVertical: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#444',
    fontWeight: '900',
  },
});

export default CategoryWrapper;
