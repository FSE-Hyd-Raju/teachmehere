import React from 'react';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { View, FlatList, StyleSheet, PanResponder } from 'react-native';
import SearchBlock from '../../components/SearchBlock';
import SkillsHorizontalScroll from '../../components/SkillComponents/SkillsHorizontalScroll';
import SkillSearchResults from '../../components/SkillComponents/SkillSearchResults';
import withRefetch from '../../components/hoc/withRefetch';
import withDelayedLoading from '../../components/hoc/withDelayedLoading';
import {
  getSectionFetchFunctionFromUrlGetter as getFetchFunction,
  getSearchFetchFunctionFromQuery,
} from '../../api/skills';
import {
  getTrendingSkillsUrl,
  getPopularSkillsUrl,
  getTopRatedSkillsUrl,
} from '../../api/urls';
import Theme from '../../Theme';

const BROWSE_SECTIONS = [
  {
    title: 'Trending Tech',
    fetchFunction: getFetchFunction(getTrendingSkillsUrl),
  },
  // {
  //   title: 'Recomended',
  //   fetchFunction: getFetchFunction(getTrendingWeeklySkillsUrl),
  // },
  // { title: 'Popular', fetchFunction: getFetchFunction(getPopularSkillsUrl) },
  // { title: 'Top Rated', fetchFunction: getFetchFunction(getTopRatedSkillsUrl) },
];

class Home extends React.Component {
  constructor(props) {
    super(props);

    const sectionsSkills = BROWSE_SECTIONS.reduce((obj, section) => {
      obj[section.title] = [];
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
    requestAnimationFrame(() => this.initialSectionsFetch());
  }

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

  renderHomeSections() {
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
    return (
      <View style={styles.container}>
        <View style={styles.bottomContainer} {...this.panResponder.panHandlers}>
          {this.renderHomeSections()}
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

export default withNavigationFocus(withRefetch(withDelayedLoading(Home)));
