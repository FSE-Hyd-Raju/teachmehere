import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { Button, ActivityIndicator, Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import CourseListCard from '../../../components/common/CourseListCard';
import {
  searchSelector,
  updateRecentSearches,
  setFilterObj,
  fetchSearchResults,
} from '../../../redux/slices/searchSlice';

export default function SearchResultsPage({ filterclicked, navigation }) {
  const dispatch = useDispatch();
  const {
    searchQuery,
    searchResults,
    recentlySearchedText,
    recentlyViewedCourses,
    loading,
    filterObj,
    isRefreshing,
  } = useSelector(searchSelector);
  const [page, setPage] = React.useState(0);

  const courseClicked = course => {
    Keyboard.dismiss();
    navigation.navigate('SkillDetail', {
      skill: course,
    });
    var item = {
      search: searchQuery,
      course: course,
    };
    dispatch(
      updateRecentSearches(item, recentlySearchedText, recentlyViewedCourses),
    );
  };

  const wishlistClicked = item => {
    console.log('wishlistClicked clicked');
  };

  const filterButtonClicked = () => {
    console.log('filter');
    Keyboard.dismiss();
    filterclicked();
  };

  const couseCountFound = () => {
    return searchResults.count != undefined
      ? searchResults.count +
          ' skill' +
          (searchResults.count != 1 ? 's' : '') +
          ' found'
      : '';
  };

  const renderFooter = () => {
    if (!isRefreshing) return null;
    return <ActivityIndicator color={Colors.black} />;
  };

  const fetchData = page => {
    dispatch(
      fetchSearchResults({
        textentered: searchQuery,
        filterQuery: filterObj,
        page: page,
      }),
    );
  };

  const handleLoadMore = () => {
    if (!loading && searchResults.response.length < searchResults.count) {
      fetchData(page + 1);
      setPage(page + 1);
    }
  };

  const onRefresh = () => {
    fetchData(0);
    setPage(0);
  };

  const cardListComponent = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{ paddingTop: 12 }}> {couseCountFound()}</Text>
              <View style={{ alignItems: 'flex-end' }}>
                <Button
                  compact={true}
                  color="black"
                  uppercase={false}
                  style={styles.filterBtn}
                  icon="tune"
                  mode="outlined"
                  onPress={() => filterButtonClicked()}>
                  Filters
                </Button>
              </View>
            </View>
            <FlatList
              onScrollBeginDrag={Keyboard.dismiss}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'handled'}
              data={searchResults.response}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <CourseListCard
                  course={item}
                  courseClicked={() => courseClicked(item)}
                  wishlistClicked={() => wishlistClicked(item)}
                />
              )}
              ListFooterComponent={renderFooter}
              onEndReachedThreshold={0.4}
              onEndReached={handleLoadMore}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={onRefresh} />
              }
              contentContainerStyle={{ paddingBottom: 80, marginRight: 30 }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return cardListComponent();
}

const styles = StyleSheet.create({
  filterBtn: {
    width: 90,
    marginTop: 15,
    marginHorizontal: 15,
    marginBottom: 5,
  },
});
