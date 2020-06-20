import React from 'react';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { View, FlatList, StyleSheet, PanResponder } from 'react-native';
import SearchBlock from '../components/SearchBlock';
import SkillsHorizontalScroll from '../components/SkillComponents/SkillsHorizontalScroll';
import SkillSearchResults from '../components/SkillComponents/SkillSearchResults';
import withRefetch from '../components/hoc/withRefetch';
import withDelayedLoading from '../components/hoc/withDelayedLoading';
import {
  getSectionFetchFunctionFromUrlGetter as getFetchFunction,
  getSearchFetchFunctionFromQuery,
} from '../api/skills';
import {
  getTrendingDailySkillsUrl,
  getTrendingWeeklySkillsUrl,
  getPopularSkillsUrl,
  getTopRatedSkillsUrl,
} from '../api/urls';
import Theme from '../Theme';

const BROWSE_SECTIONS = [
  // {
  //   title: 'Trending Daily',
  //   fetchFunction: getFetchFunction(getTrendingDailySkillsUrl),
  // },
  // {
  //   title: 'Trending Weekly',
  //   fetchFunction: getFetchFunction(getTrendingWeeklySkillsUrl),
  // },
  // { title: 'Popular', fetchFunction: getFetchFunction(getPopularSkillsUrl) },
  // { title: 'Top Rated', fetchFunction: getFetchFunction(getTopRatedSkillsUrl) },
];

class Browse extends React.Component {
  constructor(props) {
    super(props);

    const sectionsSkills = BROWSE_SECTIONS.reduce((obj, section) => {
      obj[section.title] = []; // eslint-disable-line
      return obj;
    }, {});

    this.state = {
      isInitialSearch: true,
      isSearchBlockFocused: false,
      searchResultsFetchFunction: getSearchFetchFunctionFromQuery(''),
      searchText: '',
      sectionsSkills,
    };

    this.createKeyboardDismissResponder();
  }

  componentDidMount() {
    // eslint-disable-next-line
    requestAnimationFrame(() => this.initialSectionsFetch());
  }

  onSearchBlockFocus = () => this.setState({ isSearchBlockFocused: true });
  onSearchBlockBlur = () => this.setState({ isSearchBlockFocused: false });
  onSearchTextInputRef = ref => (this.searchTextInput = ref);

  onSearchTextChange = text => {
    const additionalProps = text.length === 0 ? { isInitialSearch: true } : {};
    this.setState({ searchText: text, ...additionalProps });
  };

  onDelayedInput = async () => {
    const { searchText } = this.state;
    this.setState({
      searchResultsFetchFunction: getSearchFetchFunctionFromQuery(searchText),
      isInitialSearch: false,
    });
  };

  createKeyboardDismissResponder() {
    const onResponder = () => {
      this.searchTextInput.blur();
      return false;
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: onResponder,
      onStartShouldSetPanResponderCapture: onResponder,
    });
  }

  initialSectionsFetch() {
    const {
      refetch: { fetchUntilSuccess },
    } = this.props;

    BROWSE_SECTIONS.forEach(section =>
      fetchUntilSuccess(() => section.fetchFunction({ page: 1 })).then(data => {
        const { sectionsSkills } = this.state;
        const newSections = {
          ...sectionsSkills,
          [section.title]: data.skills,
        };

        this.setState({ sectionsSkills: newSections });
      }),
    );
  }

  renderSkillsScrollSection = ({ item: { title, fetchFunction } }) => {
    const { sectionsSkills } = this.state;
    return (
      <SkillsHorizontalScroll
        fetchFunction={fetchFunction}
        skills={sectionsSkills[title]}
        title={title}
      />
    );
  };

  renderBrowseSections() {
    const { sectionsSkills } = this.state;
    const keyExtractor = section => section.title;

    return (
      <FlatList
        data={BROWSE_SECTIONS}
        extraData={sectionsSkills}
        keyExtractor={keyExtractor}
        renderItem={this.renderSkillsScrollSection}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  render() {
    const {
      searchText,
      searchResultsFetchFunction,
      isInitialSearch,
      isSearchBlockFocused,
    } = this.state;

    return (
      <View style={styles.container}>
        <SearchBlock
          value={searchText}
          style={styles.search}
          inputRef={this.onSearchTextInputRef}
          onBlockBlur={this.onSearchBlockBlur}
          onBlockFocus={this.onSearchBlockFocus}
          onChangeText={this.onSearchTextChange}
          onDelayedInput={this.onDelayedInput}
        />

        <View style={styles.bottomContainer} {...this.panResponder.panHandlers}>
          {this.renderBrowseSections()}
          {isSearchBlockFocused && (
            <SkillSearchResults
              initialSearch={isInitialSearch}
              fetchFunction={searchResultsFetchFunction}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  search: {
    marginVertical: Theme.spacing.tiny,
  },
  bottomContainer: {
    flex: 1,
  },
});

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(
  mapStateToProps,
  {},
)(withNavigationFocus(withRefetch(withDelayedLoading(Browse))));
