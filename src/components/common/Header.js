import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = props => {
  const { title, backAction } = props;
  return (
    <View style={styles.headerStyle}>
      <IconMaterialIcons
        name="arrow-back"
        style={styles.iconStyle}
        size={27}
        onPress={() => backAction()}
      />
      <Text style={[styles.titleStyle, styles.iconStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    width: '100%',
    height: 52,
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 3,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconStyle: {
    marginTop: 12,
    marginLeft: 15,
  },
});

export default Header;
