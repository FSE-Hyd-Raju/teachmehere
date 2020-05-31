import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import { View, StyleSheet } from 'react-native';
import SkillScoreYear from './SkillScoreYear';
import { AppText, TouchableHighlightView } from '../common';
import { getW185ImageUrl } from '../../api/urls';
import RouteNames from '../../RouteNames';
import Theme from '../../Theme';

class SkillInlinePreview extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  onPress = () => {
    const { navigation, skill } = this.props;
    navigation.push(RouteNames.SkillDetailsScreen, { skill });
  };

  render() {
    const { skill } = this.props;
    return (
      <TouchableHighlightView
        scaleFactor={0.98}
        contentStyle={styles.container}
        onPress={this.onPress}
      >
        <FastImage style={styles.poster} source={{ uri: getW185ImageUrl(skill.poster_path) }} />
        <View style={styles.textWrapper}>
          <AppText type="headline" numberOfLines={1} style={styles.title}>
            {skill.title}
          </AppText>
          <SkillScoreYear skill={skill} />
        </View>
      </TouchableHighlightView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 96,
    paddingVertical: Theme.spacing.xTiny
  },
  poster: {
    height: '100%',
    aspectRatio: Theme.specifications.posterAspectRation,
    marginHorizontal: Theme.spacing.tiny,
    backgroundColor: Theme.gray.dark
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    width: '95%'
  }
});

SkillInlinePreview.propTypes = {
  skill: PropTypes.object.isRequired
};

export default withNavigation(SkillInlinePreview);
