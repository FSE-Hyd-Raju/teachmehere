import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Chip } from 'react-native-paper';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux'
import CourseCard from '../../../components/common/coursecard';
import { searchSelector, removeRecentlyViewedCourses, removeRecentlySearchedText } from '../../../redux/slices/searchSlice'


export default function SearchLandingPage({ searchChipSelected }) {

    const dispatch = useDispatch()
    const { recentlySearchedText, recentlyViewedCourses, topCategories } = useSelector(searchSelector)

    const topCategoriesData1 = [
        {
            "categoryName": "IT & Software",
            "iconName": "computer",
        },
        {
            "categoryName": "Singing",
            "iconName": "music-note",
        },
        {
            "categoryName": "Photography",
            "iconName": "camera",
        },
        {
            "categoryName": "Cooking",
            "iconName": "local-dining",
        }
    ]

    const showTopCategories = () => {
        return (
            !!topCategories.length &&
            (<View style={styles.topCategories}>
                <Text h2 style={styles.topCategoriesHeading}>Top Categories</Text>
                <View style={styles.topCategoriesContainer}>
                    {topCategories.map(category => (
                        <TouchableOpacity
                            style={styles.category}
                            onPress={() => alert("Imagine it navigated to category based courses page")}
                        >
                            <View style={styles.IconAndName}>
                                <IconMaterialIcons
                                    name={category.iconName}
                                    color="#000"
                                    size={30}
                                />
                                <Text>{category.categoryName}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>)
        )
    }

    const recentlyViewedCoursesComponent = () => {
        return (
            recentlyViewedCourses && !!recentlyViewedCourses.length &&
            <View style={[styles.topCategories, { marginBottom: 0 }]}>
                <View >
                    <Text h2 style={styles.topCategoriesHeading}>Recently Viewed Courses</Text>
                </View>
                <View style={styles.recentlyViewedCoursesContainer}>
                    <FlatList
                        data={recentlyViewedCourses}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.recentlyViewedCoursesTextIcon}>
                                    <CourseCard course={item} courseClicked={() => alert("Imagine it navigated to course detail page")} wishlistClicked={() => alert("Imagine course added to wishlist")} />
                                    <IconMaterialIcons
                                        name={"cancel"}
                                        color="rgb(102, 94, 94)"
                                        size={20}
                                        style={{ height: 20 }}
                                        onPress={() => dispatch(removeRecentlyViewedCourses(item, recentlyViewedCourses))}
                                    />
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        )
    }

    const recentSearches = () => {
        return (
            recentlySearchedText && !!recentlySearchedText.length &&
            <View style={styles.topCategories}>
                <Text h2 style={styles.topCategoriesHeading}>Recent Searches</Text>
                <View style={styles.topCategoriesContainer}>
                    {recentlySearchedText.map(searchQuery => (
                        <View style={styles.IconAndName}>
                            <Chip textStyle={{ minWidth: 45 }} mode="outlined" onClose={() => dispatch(removeRecentlySearchedText(searchQuery, recentlySearchedText))}
                                onPress={() => searchChipSelected(searchQuery)} >{searchQuery}</Chip>
                        </View>
                    ))}
                </View>
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.SearchDefaultPageContainer}>
                {recentSearches()}
                {showTopCategories()}
                {recentlyViewedCoursesComponent()}
            </View >

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    recentlyViewedCoursesTextIcon: {
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1
        // justifyContent: "space-between",
        // alignItems: "center"
    },
    recentSearchsItem: {
        padding: 6,
    },
    SearchDefaultPageContainer: {
        marginBottom: 100,
        marginTop: 50
    },
    category: {
        minWidth: 140,
        borderRightWidth: 0.8,
        borderBottomWidth: 0.8,
        borderColor: '#C0C0C0',
        padding: 15,
        // alignItems: 'center',
    },
    IconAndName: {
        alignItems: 'center',
        padding: 6,
        minWidth: 60

    },
    topCategories: {
        padding: 2
    },
    topCategoriesHeading: {
        fontSize: 19,
        letterSpacing: 1,
    },
    topCategoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 20,
        marginLeft: 0,
        marginRight: 0
    },
    recentlyViewedCoursesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
        marginLeft: 0,
        marginRight: 0
    }

});
