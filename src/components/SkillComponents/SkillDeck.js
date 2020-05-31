import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Deck from '../Deck';
import InfoAbsoluteBlock from '../InfoAbsoluteBlock';
import CircleLoadingIndicator from '../CircleLoadingIndicator';
import SkillCard from './SkillCard';
import SkillSwipeImageLabel from './SkillSwipeImageLabel';
import withRefetch from '../hoc/withRefetch';
import { getW780ImageUrl } from '../../api/urls';
import { prefetchImage } from '../../utils/network';
import { skillKeyExtractor } from '../../utils/skills';
import Theme from '../../Theme';

class SkillDeck extends React.PureComponent {
  state = {
    loadedCount: 0
  };

  componentDidMount() {
    this.loadingId = 0;
    this.toLoadSkills = [];
    this.loadedSkillsIds = {};
    this.startSkillsLoading();
  }

  componentWillUpdate(nextProps) {
    if (this.props.skills !== nextProps.skills) {
      this.updateSkillsLoading(nextProps.skills);
      this.startSkillsLoading(nextProps.skills);
    }
  }

  startSkillsLoading(skills) {
    this.fillToLoadSkills(skills);
    this.recursiveImageLoad(this.toLoadSkills[0]);
  }

  updateSkillsLoading(skills) {
    this.loadingId++;

    const newLoadedImagesIds = {};
    for (let i = 0; i < skills.length; i++) {
      const skill = skills[i];
      const key = skillKeyExtractor(skill);
      if (!this.loadedSkillsIds[key]) break;
      newLoadedImagesIds[key] = true;
    }
    this.loadedSkillsIds = newLoadedImagesIds;

    const loadedCount = Object.keys(newLoadedImagesIds).length;
    this.setState({ loadedCount });
  }

  fillToLoadSkills(forceSkills) {
    const { skills } = this.props;
    const currentSkills = forceSkills || skills;

    this.toLoadSkills = currentSkills.filter(
      skill => !this.loadedSkillsIds[skillKeyExtractor(skill)]
    );
  }

  recursiveImageLoad = skill => {
    const {
      refetch: { fetchUntilSuccess }
    } = this.props;
    const { loadedCount } = this.state;

    if (skill && loadedCount < 12) {
      const skillPosterUrl = getW780ImageUrl(skill.poster_path);
      const loadingId = this.loadingId;

      fetchUntilSuccess(() => prefetchImage(skillPosterUrl)).then(() => {
        if (loadingId !== this.loadingId) return;

        this.loadedSkillsIds[skillKeyExtractor(skill)] = true;
        this.toLoadSkills.splice(0, 1);
        this.setState(prevState => ({ loadedCount: prevState.loadedCount + 1 }));
        this.recursiveImageLoad(this.toLoadSkills[0]);
      });
    }
  };

  renderNoMoreCards = () => (
    <InfoAbsoluteBlock
      Icon={<CircleLoadingIndicator color={Theme.gray.lightest} />}
      text="Loading Skills"
      subtext="Please wait"
    />
  );

  renderSkillCard = (skill, isTopCard) => (
    <SkillCard skill={skill} disabled={!isTopCard} sourceUrlGetter={getW780ImageUrl} />
  );

  renderCardSwipeLabels = ({ toLeftOpacity, toRightOpacity, toTopOpacity }) => {
    const horizontalMargin = 40;
    const verticalMargin = 60;
    const rotationDegrees = 15;

    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* Opacity has to be applied on Animated.View wrapper */}
        <Animated.View style={{ opacity: toRightOpacity }}>
          <SkillSwipeImageLabel
            style={{
              top: verticalMargin,
              left: horizontalMargin,
              transform: [{ rotate: `-${rotationDegrees}deg` }]
            }}
            type="save"
          />
        </Animated.View>
        <Animated.View style={{ opacity: toLeftOpacity }}>
          <SkillSwipeImageLabel
            style={{
              top: verticalMargin,
              right: horizontalMargin,
              transform: [{ rotate: `${rotationDegrees}deg` }]
            }}
            type="skip"
          />
        </Animated.View>
        <Animated.View style={{ opacity: toTopOpacity, flex: 1 }}>
          <SkillSwipeImageLabel
            style={{
              alignSelf: 'center',
              bottom: verticalMargin * 1.5
            }}
            type="like"
          />
        </Animated.View>
      </View>
    );
  };

  render() {
    const { loadedCount } = this.state;
    const { skills, ...props } = this.props;
    const sliceLength = Math.min(loadedCount, 2);
    const loadedSkills = skills.slice(0, sliceLength);

    return (
      <Deck
        data={loadedSkills}
        style={styles.deck}
        useDeckIndex={false}
        renderCard={this.renderSkillCard}
        renderCardSwipeLabels={this.renderCardSwipeLabels}
        renderNoMoreCards={this.renderNoMoreCards}
        keyExtractor={skillKeyExtractor}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    margin: 14
  }
});

export default withRefetch(SkillDeck);
