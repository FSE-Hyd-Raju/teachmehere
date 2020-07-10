import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { TextInput, StyleSheet, View, BackHandler, Text } from 'react-native';
import Theme from '../../Theme';
import Config from '../../Config';

export default class Search extends Component {
  render() {
    return <View style={[styles.container]}>
      <Text>sad</Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
