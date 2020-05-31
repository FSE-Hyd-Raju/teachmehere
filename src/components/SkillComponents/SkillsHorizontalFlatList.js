import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SkillPreview from './SkillPreview';
import { skillKeyExtractor } from '../../utils/skills';
import Theme from '../../Theme';

class SkillsHorizontalList extends React.PureComponent {
  renderPreview = ({ item, index }) => <SkillPreview skill={item} highPriority={index < 5} />;
  renderEmptyContainer = () => _.times(4).map((r, i) => <SkillPreview key={i} />);
  renderHeader = () => <View style={{ width: this.props.paddingLeft - Theme.spacing.tiny }} />;

  render() {
    const { skills, paddingLeft } = this.props;
    const isEmpty = skills.length === 0;

    return (
      <FlatList
        horizontal
        data={skills}
        scrollEnabled={!isEmpty}
        initialNumToRender={5}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={paddingLeft && this.renderHeader}
        ListEmptyComponent={this.renderEmptyContainer}
        keyExtractor={skillKeyExtractor}
        renderItem={this.renderPreview}
      />
    );
  }
}

SkillsHorizontalList.propTypes = {
  skills: PropTypes.array.isRequired,
  paddingLeft: PropTypes.number
};

export default SkillsHorizontalList;
