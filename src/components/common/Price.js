import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Price = props => {
  const { oneonone, group } = props.price || {};
  return (
    <View style={{ flexDirection: "row" }}>
      <View >
        <Text style={styles.priceLable}>1X1</Text>
        <Text style={styles.price}>{props.currency} {oneonone}</Text>
      </View>
      <View style={{ borderLeftWidth: 1, borderColor: "lightgrey", paddingLeft: 20 }}>
        <Text style={styles.priceLable}>Group</Text>
        {!!group && <Text style={styles.price}>{props.currency} {group.price}</Text>}
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
    width: 60,
  },
  price: {
    width: 60,
    fontWeight: 'bold',
  },
  devider: {
    borderLeftWidth: 1,
    borderLeftColor: '#4444',
  },
});

export default Price;
