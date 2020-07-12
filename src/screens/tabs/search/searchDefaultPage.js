import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, Dimensions, ScrollView, FlatList } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CourseCard from '../../../components/common/coursecard';

export default function SearchDefaultPage({ recentSearchesData, recentViewedCoursesData, removeRecentSearchItem, remmoveRecentlyViewedCourses, searchChipSelected }) {

    const topCategoriesData = [
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

    const recentlyViewedCategoriesData = [
        {
            "categoryName": "IT & Software",
            "iconName": "computer",
        },
        {
            "categoryName": "Painting",
            "iconName": "brush",
        },
        {
            "categoryName": "Communication",
            "iconName": "record-voice-over",
        }
    ]

    const courseData = [
        { "_id": "5ea3239be75b624c81f71f56", "uid": "5ed1d67917fb06f371418c64", "coursename": "Angularjs", "courselevel": "medium", "category": "art", "subcategory": "dancing", "totalhours": 10, "price": 2000, "experience": 4, "demo": "no", "speakinglanguages": ["telugu", "english"], "usersrated": 1, "createddate": "2020-05-30 03:43:51.957000", "updateddate": "2020-06-06 14:49:10.982000", "rating": { "1": 0, "2": 0, "3": 0, "4": 0, "5": 1 }, "avgrating": 5, "username": "jakkulaashwini.3@gmail.com", "email": "jakkulaashwini.3@gmail.com", "phonenumber": "9999999999", "devicetoken": "czfA6V3956s:APA91bEA7KMfRh_2xlgOzpcbrHawyoC5SBIfGkCiq9rQbM72cnIMTCPFUNwuBE3YDAsuVNH6ZDAlpNZfX1YIulXyZ5cskrlDNQDocwWF8sebq6PiTOkJB4ax8DYFFRQHLhEs9bgXNvNo", "description": "Okay" }, { "_id": "5ea3d6e299306cc7f99b9d4c", "uid": "5ed1d67917fb06f371418c64", "coursename": "Reactjs", "courselevel": "medium", "category": "software", "subcategory": "FrontendTech", "totalhours": 10, "price": { "oneonone": 2000, "group": { "members": 6, "price": 1000 } }, "experience": 4, "demo": "no", "speakinglanguages": ["telugu", "english"], "usersrated": 0, "createddate": "2020-05-30 03:43:51.957000", "updateddate": "2020-06-06 14:49:10.982000", "avgrating": 4, "username": "jakkulaashwini.3@gmail.com", "email": "jakkulaashwini.3@gmail.com", "phonenumber": "9999999999", "devicetoken": "czfA6V3956s:APA91bEA7KMfRh_2xlgOzpcbrHawyoC5SBIfGkCiq9rQbM72cnIMTCPFUNwuBE3YDAsuVNH6ZDAlpNZfX1YIulXyZ5cskrlDNQDocwWF8sebq6PiTOkJB4ax8DYFFRQHLhEs9bgXNvNo", "description": "Okay" },
        { "_id": "5ea3239be75b624c81f71f56", "uid": "5ed1d67917fb06f371418c64", "coursename": "Python", "courselevel": "medium", "category": "art", "subcategory": "dancing", "totalhours": 10, "price": 2000, "experience": 4, "demo": "no", "speakinglanguages": ["telugu", "english"], "usersrated": 1, "createddate": "2020-05-30 03:43:51.957000", "updateddate": "2020-06-06 14:49:10.982000", "rating": { "1": 0, "2": 0, "3": 0, "4": 0, "5": 1 }, "avgrating": 5, "username": "jakkulaashwini.3@gmail.com", "email": "jakkulaashwini.3@gmail.com", "phonenumber": "9999999999", "devicetoken": "czfA6V3956s:APA91bEA7KMfRh_2xlgOzpcbrHawyoC5SBIfGkCiq9rQbM72cnIMTCPFUNwuBE3YDAsuVNH6ZDAlpNZfX1YIulXyZ5cskrlDNQDocwWF8sebq6PiTOkJB4ax8DYFFRQHLhEs9bgXNvNo", "description": "Okay" }, { "_id": "5ea3d6e299306cc7f99b9d4c", "uid": "5ed1d67917fb06f371418c64", "coursename": "Ielts", "courselevel": "medium", "category": "software", "subcategory": "FrontendTech", "totalhours": 10, "price": { "oneonone": 2000, "group": { "members": 6, "price": 1000 } }, "experience": 4, "demo": "no", "speakinglanguages": ["telugu", "english"], "usersrated": 0, "createddate": "2020-05-30 03:43:51.957000", "updateddate": "2020-06-06 14:49:10.982000", "avgrating": 4, "username": "jakkulaashwini.3@gmail.com", "email": "jakkulaashwini.3@gmail.com", "phonenumber": "9999999999", "devicetoken": "czfA6V3956s:APA91bEA7KMfRh_2xlgOzpcbrHawyoC5SBIfGkCiq9rQbM72cnIMTCPFUNwuBE3YDAsuVNH6ZDAlpNZfX1YIulXyZ5cskrlDNQDocwWF8sebq6PiTOkJB4ax8DYFFRQHLhEs9bgXNvNo", "description": "Okay" }
    ]

    const recentser = ["angasdfasdfasdfasdfsdafs", "angular", "asdfj"]

    const topCategories = () => {
        return (
            <View style={styles.topCategories}>
                <Text h2 style={styles.topCategoriesHeading}>Top Categories</Text>
                <View style={styles.topCategoriesContainer}>
                    {topCategoriesData.map(category => (
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
            </View>
        )
    }

    const recentlyViewedCategories = () => {
        return (
            <View style={styles.topCategories}>
                <Text h2 style={styles.topCategoriesHeading}>Recently Viewed Categories</Text>
                <View style={styles.topCategoriesContainer}>
                    {recentlyViewedCategoriesData.map(category => (
                        <TouchableOpacity
                            style={styles.category}
                        // onPress={() => this.showSubCategories(category)}
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
            </View>
        )
    }

    const recentlyViewedCourses = () => {
        return (
            <View style={[styles.topCategories, { marginBottom: 0 }]}>
                <View >
                    <Text h2 style={styles.topCategoriesHeading}>Recently Viewed Courses</Text>
                </View>
                <View style={styles.recentlyViewedCoursesContainer}>
                    <FlatList
                        data={recentViewedCoursesData}
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
                                        onPress={() => remmoveRecentlyViewedCourses(item)}
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
            <View style={styles.topCategories}>
                <Text h2 style={styles.topCategoriesHeading}>Recent Searches</Text>
                <View style={styles.topCategoriesContainer}>
                    {recentSearchesData.map(searchQuery => (
                        // <TouchableOpacity
                        //     style={styles.recentSearchsItem}
                        // // onPress={() => this.showSubCategories(category)}
                        // >
                        <View style={styles.IconAndName}>
                            <Chip textStyle={{ minWidth: 45 }} mode="outlined" onClose={() => removeRecentSearchItem(searchQuery)}
                                onPress={() => searchChipSelected(searchQuery)} >{searchQuery}</Chip>
                        </View>
                        // </TouchableOpacity>

                    ))}
                </View>
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.SearchDefaultPageContainer}>

                {/* {recentSearches()} */}
                {recentSearchesData && !!recentSearchesData.length && recentSearches()}
                {/* {recentlyViewedCategories()} */}
                {topCategories()}
                {/* {recentlyViewedCourses()} */}

                {recentViewedCoursesData && !!recentViewedCoursesData.length && recentlyViewedCourses()}
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
        marginBottom: 100
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
