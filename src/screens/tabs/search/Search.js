import React, { useEffect, useRef } from 'react';
import { StyleSheet, Image, Text, View, FlatList, BackHandler, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { Searchbar, ActivityIndicator, Colors, Button } from 'react-native-paper';
import { Icon, Header } from 'react-native-elements';
import { storeAsyncData, getAsyncData, clearAsyncData } from '../../../components/common/asyncStorage';
import SideMenu from 'react-native-side-menu';
import { useDispatch, useSelector } from 'react-redux'
import FilterPage from '../../../components/common/filterPage';
import CourseCard from '../../../components/common/coursecard';
import SearchDefaultPage from './searchDefaultPage';
import { searchSelector, fetchSearchResults, getRecentSearches, updateRecentSearches } from '../../../redux/slices/searchSlice'

export default function SearchPage() {

  const dispatch = useDispatch()
  const { searchResults, loading, hasErrors, recentlySearchedText, recentlyViewedCourses } = useSelector(searchSelector)

  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [openFilterPage, setOpenFilterPage] = React.useState(false);
  const [filterObj, setFilterObj] = React.useState({});

  const timerRef = useRef(null);
  const searchBarRef = useRef(null);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  // clearAsyncData()

  dispatch(getRecentSearches())

  const backButtonHandler = () => {
    return BackHandler.addEventListener(
      'hardwareBackPress',
      function () {
        if (openFilterPage) {
          setOpenFilterPage(false);
          return true;
        }
        else if ((isSearchFocused || searchBarRef.current.isFocused())) {
          searchBackFun();
          return true;
        }
        return false;
      },
    );
  }

  useEffect(() => {
    let backhandler = backButtonHandler()
    return () => {
      backhandler.remove();
    };
  }, [openFilterPage, isSearchFocused]);


  const fetchData = (query, filterObj) => {
    dispatch(fetchSearchResults({
      "textentered": query,
      "filterQuery": filterObj
    }))
  }

  const searchFun = (query) => {
    setSearchQuery(query)
    // setCourseData([])
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (query)
      timerRef.current = setTimeout(() => {
        fetchData(query, filterObj)
      }, 200)
  }


  const searchChipSelected = (searchQuery) => {
    setIsSearchFocused(true)
    setSearchQuery(searchQuery)
    searchFun(searchQuery)
  }

  const searchBackFun = () => {
    searchBarRef.current.blur()
    // searchBarRef.current.clear()
    setSearchQuery("")
    // setCourseData([])
    setIsSearchFocused(false)
  }

  const searchComponent = () => {
    return (
      <Searchbar
        ref={searchBarRef}
        onFocus={() => setIsSearchFocused(true)}
        icon={isSearchFocused ? "arrow-left" : null}
        onIconPress={isSearchFocused ? searchBackFun : null}
        inputStyle={{ fontSize: 13 }}
        placeholder="Search by course name, category.."
        placeholderStyle={{ fontSize: 10 }}
        onChangeText={searchFun}
        value={searchQuery}
      />
    )
  }

  const loadingComponent = () => {
    return (
      <View style={styles.loadingBar}>
        <ActivityIndicator size={35} animating={true} color={Colors.red800} />
      </View>
    )
  }

  const courseClicked = (course) => {
    Keyboard.dismiss()
    console.log(course.coursename)
    alert("Imagine it navigated to course detail page")
    var item = {
      search: searchQuery,
      course: course
    }
    dispatch(updateRecentSearches(item))
  }

  const wishlistClicked = (item) => {
    console.log("wishlistClicked clicked")
  }

  const filterButtonClicked = () => {
    console.log("filter")
    console.log(openFilterPage)
    Keyboard.dismiss();
    setOpenFilterPage(!openFilterPage);
  }

  const couseCountFound = () => {
    return (
      !!searchQuery ? (searchResults.length + " course" + (searchResults.length > 1 ? "s" : "") + " found") : ""
    )
  }

  const cardListComponent = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, marginBottom: 80 }}>
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ paddingTop: 12 }}> {couseCountFound()}</Text>
              <View style={{ alignItems: "flex-end" }}>
                <Button compact={true} color="black" uppercase={false} style={{ width: 90, marginTop: 15, marginHorizontal: 15, marginBottom: 5 }} icon="tune" mode="outlined" onPress={() => filterButtonClicked()}>
                  Filters
                            </Button>
              </View>
            </View>
            <FlatList
              onScrollBeginDrag={Keyboard.dismiss}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'handled'}
              data={searchResults}
              keyExtractor={item => item._id}
              renderItem={({ item }) => <CourseCard course={item} courseClicked={() => courseClicked(item)} wishlistClicked={() => wishlistClicked(item)} />}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const defaultPageComponent = () => {
    return (
      <View style={styles.defaultPage}>
        <SearchDefaultPage searchChipSelected={(searchQuery) => searchChipSelected(searchQuery)}
        ></SearchDefaultPage>
      </View>
    )
  }

  const applyFilter = (filterObj) => {
    console.log(filterObj)
    // alert(JSON.stringify(filterObj))
    setOpenFilterPage(false)
    var filter = {}
    if (filterObj && filterObj["$and"] && filterObj["$and"].length)
      filter = filterObj;
    setFilterObj(filterObj)

    // setCourseData([])
    if (searchQuery) fetchData(searchQuery, filter)
  }

  const clearFilter = () => {
    console.log("clear")
    // alert("cleared")
    setFilterObj({})
    setOpenFilterPage(false)
    // setCourseData([])
    if (searchQuery) fetchData(searchQuery, {})
  }

  return (
    <SideMenu
      // openMenuOffset={SCREEN_WIDTH}
      onChange={(isopen) => setOpenFilterPage(isopen)}
      menuPosition="right"
      isOpen={openFilterPage}
      disableGestures={true}
      menu={
        <View style={{ backgroundColor: '#fafafa', }}>
          <FilterPage
            onFilterClose={() => setOpenFilterPage(false)}
            applyFilter={(filterObj) => applyFilter(filterObj)}
            clearFilter={() => clearFilter()}
          />
        </View>} >
      <View style={styles.container} >
        {searchComponent()}
        {!isSearchFocused ? defaultPageComponent() :
          loading ? loadingComponent() : cardListComponent()
        }
      </View >
    </SideMenu>
  );
}

const styles = StyleSheet.create({
  defaultPage: {
    marginTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    paddingBottom: 0
  },
  loadingBar: {
    marginTop: 40
  }

});
