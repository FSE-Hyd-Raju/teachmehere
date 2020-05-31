import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TouchableScale } from '../common';
// import SkillDetailsScreen from '../../screens/Skill/SkillDetailsScreen';
import RouteNames from '../../RouteNames';
import { getW185ImageUrl } from '../../api/urls';
import Theme from '../../Theme';

const { width } = Dimensions.get('window');
const PREVIEW_WIDTH = width * 0.27;

class SkillPreview extends React.PureComponent {
  static getPreviewHeight = () => PREVIEW_WIDTH / Theme.specifications.posterAspectRation;

  onPress = () => {
    const { navigation, skill } = this.props;
    navigation.push(RouteNames.SkillDetailsScreen, { skill });
    // navigation.navigate(RouteNames.SkillDetailsScreen, { skill }, null, id);
  };

  renderSkill() {
    const { skill, highPriority } = this.props;
    const priority = highPriority ? FastImage.priority.high : FastImage.priority.normal;
    return (
      <FastImage
        style={styles.image}
        source={{ uri: getW185ImageUrl(skill.poster_path), priority }}
      />
    );
  }

  renderEmptySkillView = () => <View style={styles.image} />;

  render() {
    const { skill, style } = this.props;

    return (
      <TouchableScale
        disabled={!skill}
        scaleFactor={0.97}
        style={[styles.container, style]}
        onPress={this.onPress}
      >
        {skill ? this.renderSkill() : this.renderEmptySkillView()}
      </TouchableScale>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.tiny
  },
  image: {
    width: PREVIEW_WIDTH,
    aspectRatio: Theme.specifications.posterAspectRation,
    borderRadius: 8,
    backgroundColor: Theme.colors.transparentBlack
  }
});

SkillPreview.propTypes = {
  skill: PropTypes.object,
  highPriority: PropTypes.bool,
  style: PropTypes.any
};

export default withNavigation(SkillPreview);
