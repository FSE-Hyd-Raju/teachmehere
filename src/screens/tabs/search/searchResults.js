import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import CourseCard from '../../../components/common/coursecard';
import { searchSelector, updateRecentSearches } from '../../../redux/slices/searchSlice'

export default function SearchResultsPage({ filterclicked }) {
    const dispatch = useDispatch()
    const { searchQuery, searchResults, recentlySearchedText, recentlyViewedCourses } = useSelector(searchSelector)

    const courseClicked = (course) => {
        Keyboard.dismiss()
        console.log(course.coursename)
        alert("Imagine it navigated to course detail page")
        var item = {
            search: searchQuery,
            course: course
        }
        dispatch(updateRecentSearches(item, recentlySearchedText, recentlyViewedCourses))
    }

    const wishlistClicked = (item) => {
        console.log("wishlistClicked clicked")
    }

    const filterButtonClicked = () => {
        console.log("filter")
        Keyboard.dismiss();
        filterclicked()
    }

    const couseCountFound = () => {
        return (
            !!searchResults.length ? (searchResults.length + " skill" + (searchResults.length > 1 ? "s" : "") + " found") : ""
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
                                <Button compact={true} color="black" uppercase={false} style={styles.filterBtn} icon="tune" mode="outlined" onPress={() => filterButtonClicked()}>
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


    return (
        cardListComponent()
    );
}

const styles = StyleSheet.create({
    filterBtn: {
        width: 90,
        marginTop: 15,
        marginHorizontal: 15,
        marginBottom: 5
    }
});
