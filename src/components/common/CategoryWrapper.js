import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

const CategoryWrapper = props => {
  const { title, onButtonPress, btnText } = props;
  return (
    <View style={styles.topWrapper}>
      <Text style={styles.title} type="title2">
        {title}
      </Text>
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
    alignItems: 'center',
  },
  title: {
    marginLeft: 16,
    marginVertical: 8,
  },
  moreButton: {
    padding: 8,
  },
});

export default CategoryWrapper;
