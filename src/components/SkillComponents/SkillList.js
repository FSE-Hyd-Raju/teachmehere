import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import InfoAbsoluteBlock from '../InfoAbsoluteBlock';
import SkillInlinePreview from './SkillInlinePreview';
import { skillKeyExtractor } from '../../utils/skills';
import { getSkillListEmptyIcon } from '../../utils/icons';

class SkillList extends React.PureComponent {
  renderEmptyDefault = () => {
    const { emptyText, emptySubtext } = this.props;
    return (
      <InfoAbsoluteBlock Icon={getSkillListEmptyIcon()} text={emptyText} subtext={emptySubtext} />
    );
  };

  renderEmpty = () => {
    const { renderEmptyComponent } = this.props;
    return renderEmptyComponent ? renderEmptyComponent() : this.renderEmptyDefault();
  };

  renderSkill = ({ item: skill }) => <SkillInlinePreview skill={skill} />;

  renderSkillList = () => {
    const { skills, ...props } = this.props;

    return (
      <FlatList
        data={skills}
        style={styles.list}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        renderItem={this.renderSkill}
        keyExtractor={skillKeyExtractor}
        {...props}
      />
    );
  };

  render() {
    const { skills } = this.props;
    return skills.length === 0 ? this.renderEmpty() : this.renderSkillList();
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignSelf: 'stretch'
  }
});

SkillList.propTypes = {
  skills: PropTypes.array.isRequired,
  renderEmptyComponent: PropTypes.func,
  emptyText: PropTypes.string,
  emptySubtext: PropTypes.string
};

SkillList.defaultProps = {
  emptyText: 'This list is empty'
};

export default SkillList;
