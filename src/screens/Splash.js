import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { View, StyleSheet, UIManager } from 'react-native';
import RouteNames from '../RouteNames';
import Config from '../Config';
import Theme from '../Theme';

class Splash extends React.Component {
  componentDidMount() {
    this.configureLayoutAnimation();
    this.props.navigation.navigate(RouteNames.HomeStack);
  }

  configureLayoutAnimation() {
    if (Config.isAndroid) {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

export default Splash;
