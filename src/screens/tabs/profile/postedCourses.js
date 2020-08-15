import React, { useEffect, useRef } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, TouchableHighlight, FlatList, BackHandler, TouchableWithoutFeedback, Keyboard, Dimensions, ScrollView } from 'react-native';
import { Searchbar, ActivityIndicator, Colors, Button, Title, Caption, Paragraph, List, Surface } from 'react-native-paper';
import { Icon, Header, Avatar, ListItem } from 'react-native-elements';
import IconMaterialIcons from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import CourseCard from '../../../components/common/coursecard';


export default function PostedCoursesPage({ navigation }) {
    const [showSettingsPage, setShowSettingsPage] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [courseData, setCourseData] = React.useState([]);

    useEffect(() => {
        getPostedCourses("5ed1622d0b0329e1036266f9")
    }, []);

    const getPostedCourses = (uid) => {
        setLoading(true);
        fetch('https://teachmeproject.herokuapp.com/getCourseDetailsById', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "uid": uid
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))
                if (responseJson && responseJson.length)
                    setCourseData(responseJson)
                setLoading(false);
            }).catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }

    const loadingComponent = () => {
        return (
            <View style={styles.loadingBar}>
                <ActivityIndicator size={35} animating={true} color={Colors.red800} />
            </View>
        )
    }

    const courseClicked = (course) => {
        console.log(course.coursename)
        alert("Imagine it navigated to course detail page")
    }

    const wishlistClicked = (item) => {
        console.log("wishlistClicked clicked")
    }

    const cardListComponent = () => {
        return (
            <TouchableWithoutFeedback >
                <View style={styles.cardListComponent}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={courseData}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => <CourseCard course={item} courseClicked={() => courseClicked(item)} wishlistClicked={() => wishlistClicked(item)} />}
                        style={{ marginBottom: 80 }}
                    />
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const noDataFoundComponent = () => {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 80 }}>
                <Text style={{ fontSize: 16 }}>
                    You have not posted any course yet!
            </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerComponent}>
                <Icons
                    name={"keyboard-backspace"}
                    // color="#fff"
                    size={27}
                    style={{ flex: 0.2 }}
                    onPress={() => navigation.goBack()}
                />
                <View style={{
                    alignItems: 'center',
                    justifyContent: "center",
                    flex: 0.6
                }}>
                    <Text style={styles.headerTitle}>Posted Courses</Text>
                </View>
            </View>
            {loading ? loadingComponent() : courseData.length ? cardListComponent() : noDataFoundComponent()}
        </View>

    );
}

const styles = StyleSheet.create({
    cardListComponent: {
        paddingTop: 25,
        marginBottom: 80
    },
    loadingBar: {
        marginTop: 40
    },
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: "#fff"
    },
    headerTitle: {
        fontSize: 20,
        letterSpacing: 1,
        fontFamily: "sans-serif",
    },
    headerComponent: {
        flexDirection: "row",
        height: 50,
        alignItems: 'center',
    },
});
