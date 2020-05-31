import React from 'react';
import PropTypes from 'prop-types';
import { AppText } from '../common';
import Theme from '../../Theme';

class SkillGenres extends React.PureComponent {
  generateGenresText = genres =>
    genres
      .map(g => g.name)
      .splice(0, 4)
      .reduce((acc, curr) => `${acc} · ${curr}`);

  render() {
    const {
      style,
      detailedSkill: { genres }
    } = this.props;

    return (
      genres &&
      genres.length > 0 && (
        <AppText style={[style, { color: Theme.gray.lighter }]}>
          {this.generateGenresText(genres)}
        </AppText>
      )
    );
  }
}

SkillGenres.propTypes = {
  detailedSkill: PropTypes.object,
  style: PropTypes.any
};

export default SkillGenres;
