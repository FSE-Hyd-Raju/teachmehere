import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { IconButton } from '../common';
import withRefetch from '../hoc/withRefetch';
import { getImdbLink } from '../../api/urls';
import { safeOpenURL } from '../../utils/network';
import { getAddToWatchlistIcon, getAddToFavoritesIcon, getOpenImdbIcon } from '../../utils/icons';
import {
  fetchSkillAccountState,
  changeSkillFavoriteStatus,
  changeSkillWatchlistStatus
} from '../../api/services';
import Theme from '../../Theme';

class SkillDetailsButtons extends React.PureComponent {
  state = {
    inWatchlist: false,
    isWatchlistFetching: false,
    inFavorite: false,
    isFavoriteFetching: false
  };

  componentDidMount() {
    // eslint-disable-next-line
    requestAnimationFrame(() => this.initialSkillFetch());
  }

  onAddToWatchlist = async () => {
    const { skill, refetch } = this.props;
    const { inWatchlist } = this.state;

    this.setState({ inWatchlist: !inWatchlist, isWatchlistFetching: true });
    try {
      await refetch.fetchSafe(() => changeSkillWatchlistStatus({ skill, watchlist: !inWatchlist }));
      this.setState({ inWatchlist: !inWatchlist });
    } catch (e) {
      this.setState({ inWatchlist });
    } finally {
      this.setState({ isWatchlistFetching: false });
    }
  };

  onAddToFavorites = async () => {
    const { skill, refetch } = this.props;
    const { inFavorite } = this.state;

    this.setState({ inFavorite: !inFavorite, isFavoriteFetching: true });
    try {
      await refetch.fetchSafe(() => changeSkillFavoriteStatus({ skill, favorite: !inFavorite }));
      this.setState({ inFavorite: !inFavorite });
    } catch (e) {
      this.setState({ inFavorite });
    } finally {
      this.setState({ isFavoriteFetching: false });
    }
  };

  initialSkillFetch() {
    const { skill, user, refetch } = this.props;

    refetch
      .fetchUntilSuccess(() => fetchSkillAccountState({ skill }))
      .then(({ favorite, watchlist }) => {
        this.setState({ inWatchlist: watchlist, inFavorite: favorite });
      });
  }

  openImdb = () => {
    const { detailedSkill } = this.props;
    safeOpenURL(getImdbLink(detailedSkill.imdb_id));
  };

  render() {
    const { detailedSkill, user } = this.props;
    const { inWatchlist, inFavorite, isFavoriteFetching, isWatchlistFetching } = this.state;
    const isAuthenticated = true;
    const imdbDisabled = !detailedSkill;

    return (
      <View style={styles.container}>
        {isAuthenticated && (
          <IconButton
            disabled={isWatchlistFetching}
            style={styles.iconButton}
            onPress={this.onAddToWatchlist}
            Icon={getAddToWatchlistIcon({ inWatchlist, disabled: imdbDisabled })}
            text="Save"
          />
        )}
        {isAuthenticated && (
          <IconButton
            disabled={isFavoriteFetching}
            style={styles.iconButton}
            onPress={this.onAddToFavorites}
            Icon={getAddToFavoritesIcon({ inFavorite, disabled: imdbDisabled })}
            text="Favorite"
          />
        )}
        <IconButton
          disabled={imdbDisabled}
          style={styles.iconButton}
          onPress={this.openImdb}
          Icon={getOpenImdbIcon({ disabled: imdbDisabled })}
          text="Open Imdb"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Theme.colors.background,
    marginVertical: Theme.spacing.tiny
  },
  iconButton: {
    height: 78,
    width: '25%',
    marginVertical: Theme.spacing.xTiny
  }
});

SkillDetailsButtons.propTypes = {
  skill: PropTypes.object.isRequired,
  detailedSkill: PropTypes.object
};

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(
  mapStateToProps,
  {}
)(withRefetch(SkillDetailsButtons));
