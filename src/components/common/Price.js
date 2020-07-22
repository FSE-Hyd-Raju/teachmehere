import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Price = props => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.priceLable}>1X1</Text>
        <View style={styles.devider} />
        <Text style={styles.priceLable}>Group</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.price}>$5095</Text>
        <View style={styles.devider} />
        <Text style={styles.price}>$7855</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceLable: {
    fontSize: 12,
    color: '#4444',
    width: 40,
  },
  price: {
    width: 40,
    fontWeight: 'bold',
  },
  devider: {
    borderLeftWidth: 1,
    borderLeftColor: '#4444',
  },
});

export default Price;
