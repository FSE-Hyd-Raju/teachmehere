import React from 'react';
import { View, StyleSheet, LayoutAnimation } from 'react-native';
import { AppText } from '../common';
import SkillBackdropWithTitle from './SkillBackdropWithTitle';
import SkillDetailsButtons from './SkillDetailsButtons';
import SkillGenres from './SkillGenres';
import SkillScoreYear from './SkillScoreYear';
import SkillsHorizontalFlatList from './SkillsHorizontalFlatList';
import withRefetch from '../hoc/withRefetch';
import { fetchSkillDetailedInfo, fetchSkillRecommendations } from '../../api/skills';
import Theme from '../../Theme';
import SkillPreview from './SkillPreview';

class SkillDetails extends React.PureComponent {
  state = {
    detailedSkill: null,
    recommendedSkills: null
  };

  componentDidMount() {
    // eslint-disable-next-line
    requestAnimationFrame(() => this.loadDetailedInfo());
  }

  loadDetailedInfo = async () => {
    const {
      skill,
      refetch: { fetchUntilSuccess }
    } = this.props;
    const detailedSkill = await fetchUntilSuccess(() => fetchSkillDetailedInfo({ skill }));
    this.configureDetailsAnimation();
    this.setState({ detailedSkill });

    const { skills: recommendedSkills } = await fetchUntilSuccess(() =>
      fetchSkillRecommendations({ skill })
    );
    this.configureRecommendationsAnimation();
    this.setState({ recommendedSkills });
  };

  configureDetailsAnimation() {
    const { scaleY } = LayoutAnimation.Properties;
    const type = LayoutAnimation.Types.easeOut;

    LayoutAnimation.configureNext({
      duration: 250,
      update: { type, property: scaleY }
    });
  }

  configureRecommendationsAnimation() {
    const { opacity } = LayoutAnimation.Properties;
    const type = LayoutAnimation.Types.easeOut;

    LayoutAnimation.configureNext({
      duration: 250,
      create: { type, property: opacity },
      delete: { type, property: opacity }
    });
  }

  render() {
    const { skill } = this.props;
    const { detailedSkill, recommendedSkills } = this.state;
    const noRecommendedSkills = recommendedSkills && recommendedSkills.length === 0;

    return (
      <View style={styles.container}>
        <SkillBackdropWithTitle skill={skill} />
        <View style={styles.mh}>
          <SkillScoreYear style={styles.mb} skill={skill} />
          {detailedSkill && <SkillGenres style={styles.mb} detailedSkill={detailedSkill} />}
          <SkillDetailsButtons skill={skill} detailedSkill={detailedSkill} />
          <AppText style={styles.mb} type="headline">
            Overview
          </AppText>
          <AppText style={styles.overview}>{skill.overview}</AppText>
          <AppText style={styles.recommendationsTitle} type="headline">
            You might like
          </AppText>
        </View>

        {noRecommendedSkills ? (
          <View style={styles.noSkillsContainer}>
            <AppText type="title2">No skills found</AppText>
          </View>
        ) : (
          <SkillsHorizontalFlatList
            skills={recommendedSkills || []}
            paddingLeft={styles.mh.marginHorizontal}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.small
  },
  recommendationsTitle: {
    marginTop: Theme.spacing.base,
    marginBottom: Theme.spacing.tiny
  },
  overview: {
    color: Theme.gray.lighter
  },
  mb: {
    marginBottom: Theme.spacing.xTiny
  },
  mh: {
    marginHorizontal: Theme.spacing.small
  },
  noSkillsContainer: {
    width: '100%',
    height: SkillPreview.getPreviewHeight(),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default withRefetch(SkillDetails);
