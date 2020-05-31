import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import SkillUserScore from './SkillUserScore';
import { AppText } from '../common';
import Theme from '../../Theme';

class SkillScoreYear extends React.Component {
  render() {
    const { skill, style } = this.props;

    return (
      <View style={[styles.container, style]}>
        <SkillUserScore style={styles.score} skill={skill} />
        <AppText style={styles.year}>{skill.year}</AppText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  score: {
    marginRight: Theme.spacing.tiny
  },
  year: {
    color: Theme.gray.lighter
  }
});

SkillScoreYear.propTypes = {
  skill: PropTypes.object.isRequired,
  style: PropTypes.any
};

export default SkillScoreYear;
