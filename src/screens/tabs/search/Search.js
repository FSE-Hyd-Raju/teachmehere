import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, BackHandler, Dimensions } from 'react-native';
import { Searchbar, ActivityIndicator, Colors } from 'react-native-paper';
import SideMenu from 'react-native-side-menu';
import { useDispatch, useSelector } from 'react-redux'
import FilterPage from '../../../components/common/filterPage';
import SearchLandingPage from './searchLandingPage';
import { searchSelector, fetchSearchResults, getRecentSearches, clearSearchResults, setSearchQuery, fetchTopCategories } from '../../../redux/slices/searchSlice'
import SearchResultsPage from './searchResults'

export default function SearchPage() {

  const dispatch = useDispatch()
  const { searchQuery, loading, topCategories } = useSelector(searchSelector)

  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [openFilterPage, setOpenFilterPage] = React.useState(false);
  const [filterObj, setFilterObj] = React.useState({});

  const timerRef = useRef(null);
  const searchBarRef = useRef(null);
  // const SCREEN_WIDTH = Dimensions.get('window').width;
  // clearAsyncData()



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

    dispatch(getRecentSearches())
    if (topCategories && !topCategories.length)
      dispatch(fetchTopCategories())
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
    dispatch(setSearchQuery(query))
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      fetchData(query, filterObj)
    }, 800)
  }

  const searchChipSelected = (searchQuery) => {
    setIsSearchFocused(true)
    dispatch(setSearchQuery(searchQuery))
    searchFun(searchQuery)
  }

  const searchBackFun = () => {
    searchBarRef.current.blur()
    // searchBarRef.current.clear()
    dispatch(setSearchQuery(""))
    dispatch(clearSearchResults())
    setIsSearchFocused(false)
  }

  const applyFilter = (filterObj) => {
    console.log(filterObj)
    setOpenFilterPage(false)
    var filter = {}
    if (filterObj && filterObj["$and"] && filterObj["$and"].length)
      filter = filterObj;
    setFilterObj(filterObj)
    if (searchQuery) fetchData(searchQuery, filter)
  }

  const clearFilter = () => {
    console.log("clear")
    setFilterObj({})
    setOpenFilterPage(false)
    if (searchQuery) fetchData(searchQuery, {})
  }

  const loadingComponent = () => {
    return (
      <View style={styles.loadingBar}>
        <ActivityIndicator size={35} animating={true} color={Colors.red800} />
      </View>
    )
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

  const filterComponent = () => {
    return (
      <View style={{ backgroundColor: '#fafafa', }}>
        <FilterPage
          onFilterClose={() => setOpenFilterPage(false)}
          applyFilter={(filterObj) => applyFilter(filterObj)}
          clearFilter={() => clearFilter()}
        />
      </View>
    )
  }

  return (
    <SideMenu
      // openMenuOffset={SCREEN_WIDTH}
      onChange={(isopen) => setOpenFilterPage(isopen)}
      menuPosition="right"
      isOpen={openFilterPage}
      disableGestures={true}
      menu={filterComponent()} >

      <View style={styles.container} >
        {searchComponent()}
        {!isSearchFocused && <SearchLandingPage searchChipSelected={(searchQuery) => searchChipSelected(searchQuery)} />}
        {isSearchFocused && !loading && <SearchResultsPage filterclicked={() => setOpenFilterPage(!openFilterPage)} />}
        {isSearchFocused && loading && loadingComponent()}

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
