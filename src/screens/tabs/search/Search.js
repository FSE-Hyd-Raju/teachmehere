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
import { fetchSearchResults, searchSelector } from '../../../redux/slices/search'

export default function SearchPage() {

  const dispatch = useDispatch()
  const { searchResults, loading, hasErrors } = useSelector(searchSelector)

  // const searchResults = useSelector(state => state.searchResults)
  // const loading = useSelector(state => state.loading)
  // const hasErrors = useSelector(state => state.hasErrors)


  const [searchQuery, setSearchQuery] = React.useState('');
  // const [loading, setLoading] = React.useState(false);
  // const [searchResults, setCourseData] = React.useState([]);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [recentSearchesData, setRecentSearchesData] = React.useState([]);
  const [recentViewedCoursesData, setRecentViewedCoursesData] = React.useState([]);
  const [openFilterPage, setOpenFilterPage] = React.useState(false);
  const [filterObj, setFilterObj] = React.useState({});

  const timerRef = useRef(null);
  const searchBarRef = useRef(null);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  // clearAsyncData()

  useEffect(() => {
    updateRecentSearches()
    let backhandler = BackHandler.addEventListener(
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
    return () => {
      backhandler.remove();
    };
  }, [openFilterPage, isSearchFocused]);

  const fetchData = (query, filterObj) => {
    // alert(searchResults)
    dispatch(fetchSearchResults({
      "textentered": query,
      "filterQuery": filterObj
    }))
    // fetch('https://teachmeproject.herokuapp.com/searchall', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     "textentered": query,
    //     "filterQuery": filterObj
    //   })
    // }).then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(JSON.stringify(responseJson))
    //     if (responseJson && responseJson.length) {
    //       setTimeout(() => {
    //         setCourseData(responseJson)
    //       }, 100)
    //     } else {
    //       setCourseData([])
    //     }
    //     setLoading(false);
    //   }).catch((error) => {
    //     console.error(error);
    //     setLoading(false);
    //   });
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

  const onFocusedFun = () => {
    setIsSearchFocused(true)
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
      <Searchbar ref={searchBarRef}
        onFocus={onFocusedFun}
        icon={isSearchFocused ? "arrow-left" : null}
        onIconPress={isSearchFocused ? searchBackFun : null}
        inputStyle={{ fontSize: 13 }}
        // style={{ overflow: "hidden" }}
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

  const updateRecentSearches = (item) => {
    getAsyncData("recentSearches").then((data) => {
      console.log(JSON.stringify(data))
      var newdata = data ? data : { recentSearches: [], recentViewedCourses: [] }
      if (item) {
        if (!newdata.recentSearches.includes(item.search)) {
          if (newdata.recentSearches.length > 5) {
            newdata.recentSearches.pop();
          }
          newdata.recentSearches.unshift(item.search)
        }
        if (!(newdata.recentViewedCourses.filter(e => e._id === item.course._id).length)) {
          if (newdata.recentViewedCourses.length > 4) {
            newdata.recentViewedCourses.pop();
          }
          newdata.recentViewedCourses.unshift(item.course)
        }
      }
      storeAsyncData("recentSearches", newdata)
      setRecentSearchesData(newdata.recentSearches)
      setRecentViewedCoursesData(newdata.recentViewedCourses)
    }).catch((err) => {
      console.log(err)
    })
  }

  const courseClicked = (course) => {
    Keyboard.dismiss()
    console.log(course.coursename)
    alert("Imagine it navigated to course detail page")
    var item = {
      search: searchQuery,
      course: course
    }
    updateRecentSearches(item)
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

  const removeRecentSearchItem = (searchItem) => {
    getAsyncData("recentSearches").then((data) => {
      console.log("remove")
      var newdata = data ? data : { recentSearches: [], recentViewedCourses: [] }
      newdata.recentSearches = newdata.recentSearches.filter((ele) => {
        return ele != searchItem
      })
      storeAsyncData("recentSearches", newdata)
      setRecentSearchesData(newdata.recentSearches)
    }).catch((err) => {
      console.log(err)
    })
  }

  const remmoveRecentlyViewedCourses = (course) => {
    getAsyncData("recentSearches").then((data) => {
      console.log("remove")
      var newdata = data ? data : { recentSearches: [], recentViewedCourses: [] }
      newdata.recentViewedCourses = newdata.recentViewedCourses.filter((ele) => {
        return ele._id != course._id;
      })
      storeAsyncData("recentSearches", newdata)
      setRecentViewedCoursesData(newdata.recentViewedCourses)
    }).catch((err) => {
      console.log(err)
    })
  }

  const searchChipSelected = (searchQuery) => {
    onFocusedFun()
    setSearchQuery(searchQuery)
    searchFun(searchQuery)
  }

  const defaultPageComponent = () => {
    return (
      <View style={styles.defaultPage}>
        <SearchDefaultPage
          recentSearchesData={recentSearchesData}
          recentViewedCoursesData={recentViewedCoursesData}
          removeRecentSearchItem={(searchItem) => removeRecentSearchItem(searchItem)}
          remmoveRecentlyViewedCourses={(course) => remmoveRecentlyViewedCourses(course)}
          searchChipSelected={(searchQuery) => searchChipSelected(searchQuery)}
        ></SearchDefaultPage>
      </View>
    )
  }

  const sidemenuonchange = (isopen) => {
    console.log("afadsf")
    console.log(isopen)
    setOpenFilterPage(isopen)
  }

  const onFilterClose = () => {
    console.log("close")
    setOpenFilterPage(false)
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
      onChange={(isopen) => sidemenuonchange(isopen)}
      menuPosition="right"
      isOpen={openFilterPage}
      disableGestures={true}
      menu={
        <View style={{ backgroundColor: '#fafafa', }}>
          <FilterPage
            onFilterClose={() => onFilterClose()}
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
    // padding: 10,
    // borderWidth: 1
  },
  container: {
    // elevation: 10,
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // textAlign: 'center',
    padding: 30,
    paddingBottom: 0
  },
  loadingBar: {
    marginTop: 40
  }

});
