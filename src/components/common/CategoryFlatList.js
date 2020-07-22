import React from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions } from 'react-native';

const CategoryFlatList = props => {
  const renderItem = ({ item }) => (
    <View style={styles.cardStyle}>
      <Text>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={props.categories}
        renderItem={renderItem}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 13,
  },
  cardStyle: {
    padding: 16,
    backgroundColor: '#ddd',
    height: 150,
    borderRadius: 7,
    width: Dimensions.get('screen').width / 3.5,
    elevation: 5,
    alignItems: 'center',
    paddingVertical: 60,
  },
});

export default CategoryFlatList;
