import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    BackHandler,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    ScrollView,
    Alert
} from 'react-native';
import {
    Searchbar,
    ActivityIndicator,
    Colors,
    Button,
    Title,
    Caption,
    Paragraph,
    List,
    Surface,
} from 'react-native-paper';
import { Icon, Header, Avatar, ListItem } from 'react-native-elements';
import IconMaterialIcons from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileSettingsPage from './profileSettingsPage';
import RequestedCoursesPage from './requestedCourses';
import WishlistCoursesPage from './wishlistCourses';
import PostedCoursesPage from './postedCourses';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserInfo, loginSelector, logOutUser, setReqFavPostedCount } from '../../../redux/slices/loginSlice';
// import { profileSelector, setReqFavPostedCount } from '../../../redux/slices/profileSlice';

export default function Profile({ navigation }) {
    const dispatch = useDispatch();
    const { loading, userInfo, reqFavPostedCount } = useSelector(loginSelector);
    // const { reqFavPostedCount } = useSelector(profileSelector);
    const [showSettingsPage, setShowSettingsPage] = React.useState(false);

    useEffect(() => {
        if (!reqFavPostedCount._id)
            getReqFavpostedCounts()
    }, []);

    const getReqFavpostedCounts = () => {
        fetch('https://teachmeproject.herokuapp.com/getReqFavPostedCounts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uid": userInfo._id,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length)
                    dispatch(setReqFavPostedCount(responseJson[0]));
            }).catch((error) => {
                console.error(error);
            });
    }

    const logout = () => {
        dispatch(
            logOutUser({
                onSuccess: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'GuestPage' }],
                    });
                },
            }))

    }
    const logoutAlert = () =>
        Alert.alert(
            "",
            "Do you want to logout?",
            [
                {
                    text: "No",
                    onPress: () => console.log("No Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => logout() }
            ],
            { cancelable: false }
        );



    const settingsIconContainer = () => {
        return (
            <View style={styles.settingsIconContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ProfileSettings')}>
                    <IconMaterialIcons
                        name={'settings'}
                        color="rgb(102, 94, 94)"
                        size={25}
                    // onPress={() => console.log("yep")}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const userImageContainer = () => {
        return (
            <View style={styles.userImageContainer}>
                <Avatar
                    size="xlarge"
                    chevron
                    activeOpacity={0.7}
                    rounded
                    source={{ uri: userInfo.displaypic ? userInfo.displaypic : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }}
                />
                <Text style={styles.userName}>{userInfo.username}</Text>
                <Text style={styles.userEmail}>{userInfo.email}</Text>
            </View>
        );
    };

    const userDescContainer = () => {
        return (
            <View style={styles.userDescContainer}>
                <Text numberOfLines={2} style={styles.userDesc}>
                    Software developer and co-founder of TAGIdeas{' '}
                </Text>
            </View>
        );
    };

    const userStatsContainer = () => {
        return (
            <View style={styles.userStatsContainer}>
                <View style={[styles.stat, { width: '30%' }]}>
                    {/* <Text style={styles.statValue}>10</Text>
                    <Text style={styles.statText}>Requested {'\n'}courses</Text> */}

                    <TouchableOpacity onPress={() => navigation.navigate('RequestedCourses')}>
                        <Surface style={styles.surface}>
                            <Text style={styles.statValue}>{reqFavPostedCount.requestedcoursescount}</Text>
                            <Text style={styles.statText}>Requested {'\n'}courses</Text>
                        </Surface>
                    </TouchableOpacity>
                </View>
                <View style={styles.stat, { width: '30%' }}>
                    {/* <Text style={styles.statValue}>3</Text>
                    <Text style={styles.statText}>Posted {'\n'}courses</Text> */}
                    <TouchableOpacity onPress={() => navigation.navigate('PostedCourses')}>
                        <Surface style={styles.surface}>
                            <Text style={styles.statValue}>{reqFavPostedCount.coursedetailscount}</Text>
                            <Text style={styles.statText}>Posted {'\n'}courses</Text>
                        </Surface>
                    </TouchableOpacity>
                </View>
                <View style={styles.stat, { width: '30%' }}>
                    {/* <Text style={styles.statValue}>8</Text>
                    <Text style={styles.statText}>Wishlist {'\n'}courses</Text> */}
                    <TouchableOpacity onPress={() => navigation.navigate('WishlistCourses')}>
                        <Surface style={styles.surface}>
                            <Text style={styles.statValue}>{reqFavPostedCount.myfavoritescount}</Text>
                            <Text style={styles.statText}>Wishlist {'\n'}courses</Text>
                        </Surface>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const userPagesContainer = (title, icon, route) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate(route)}>
                <ListItem
                    title={title}
                    leftIcon={<Icons name={icon} color="rgb(102, 94, 94)" size={25} />}
                    pad={30}
                    titleStyle={{ letterSpacing: 1 }}
                    containerStyle={{ backgroundColor: 'unset' }}
                    chevron={
                        <Icons name={'chevron-right'} color="rgb(102, 94, 94)" size={25} />
                    }
                // onPress={() => navigation.navigate(route)}
                />
            </TouchableOpacity>
        );
    };

    const profilepagecomponent = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{ backgroundColor: "rgba(243, 246, 252, 0.7)", paddingTop: 30, paddingBottom: 60 }}>
                        {settingsIconContainer()}
                        <View style={styles.upperContainer}>
                            {userImageContainer()}
                            {userDescContainer()}

                        </View>
                    </View>
                    <View style={{
                        padding: 15,
                        width: '100%',
                        borderTopRightRadius: 45,
                        borderTopLeftRadius: 45,
                        elevation: 5,
                        marginTop: -40,
                        backgroundColor: 'white',
                        // borderColor: "#f3f6fc",
                        // borderWidth: 1
                    }}>
                        {userStatsContainer()}

                        <View style={styles.lowerContainer}>
                            {/* {userPagesContainer("Requested Courses", "send-circle-outline", 'RequestedCourses')}
                        {userPagesContainer("Posted Courses", "plus-circle-outline", 'PostedCourses')}
                        {userPagesContainer("Wishlist Courses", "heart-outline", 'WishlistCourses')} */}
                            {/* {userPagesContainer(
                            'Login',
                            'send-circle-outline',
                            'RequestedCourses',
                        )} */}

                            <View style={styles.accountContainer}>
                                <TouchableOpacity>
                                    <ListItem
                                        title={"Change Profile"}
                                        leftIcon={
                                            <Icons
                                                name={"account-arrow-right-outline"}
                                                color="#0e515c"
                                                size={25}
                                                style={{
                                                    // fontSize: 20,
                                                    // backgroundColor: "#3B6AA0",
                                                    // borderRadius: 21,
                                                    // padding: 5
                                                }}
                                            />
                                        }

                                        // pad={}
                                        titleStyle={{ letterSpacing: 1 }}
                                        // containerStyle={{ backgroundColor: 'unset' }}
                                        chevron={<Icons
                                            name={"chevron-right"}
                                            color="rgb(102, 94, 94)"
                                            size={30}
                                        />}
                                        onPress={() => navigation.navigate('ChangeProfile')}

                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <ListItem onPress={logoutAlert}
                                        title={"logout"}
                                        leftIcon={
                                            <Icons
                                                name={"logout"}
                                                color="#0e515c"
                                                size={25}
                                                style={{
                                                    // fontSize: 20,
                                                    // backgroundColor: "#3B6AA0",
                                                    // borderRadius: 21,
                                                    // padding: 5
                                                }}
                                            />}

                                        // pad={30}
                                        titleStyle={{ letterSpacing: 1 }}
                                        // containerStyle={{ backgroundColor: 'unset' }}
                                        chevron={<Icons
                                            name={"chevron-right"}
                                            color="rgb(102, 94, 94)"
                                            size={30}
                                        />}

                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    };

    return (
        <View style={styles.container}>
            {profilepagecomponent()}
        </View>
    );
}

const styles = StyleSheet.create({
    lowerContainer: {
        margin: 25,
        justifyContent: 'center',

    },
    // upperContainer: { backgroundColor: "#F8F4EE" },
    surface: {
        // margin: 3,
        padding: 5,
        height: 80,
        width: 90,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        borderColor: "rgb(225, 225, 225)",
    },
    accountsText: {
        // fontSize: 10,
        letterSpacing: 1,
        textAlign: "center",
        marginTop: 10,
        fontSize: 10
        // margin: 20
    },
    accountContainerBody: {
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly"
    },
    accountContainerTitle: {
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 1,
        marginBottom: 10

    },
    accountContainer: {
        marginTop: 20,
    },
    statText: {
        textAlign: 'center',
        color: '#7f7f7f',
        letterSpacing: 1,
    },
    statValue: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    stat: {
        alignItems: 'center',
        flexWrap: 'wrap',
        // flex: 0.3,
        width: '25%',
        paddingLeft: '1%',
    },
    userStatsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginHorizontal: 0,
        marginLeft: '5%',
        marginTop: 25,
    },
    userDesc: {
        borderRadius: 20,
        borderColor: "#dbdbdb",
        // borderWidth: 1,
        // borderWidth: 1,
        backgroundColor: 'rgba(255, 213, 87, 0.63)',
        // backgroundColor: "#ffd557",
        // marginHorizontal: 40,
        height: 75,
        width: 280,
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
        letterSpacing: 1,
        lineHeight: 20,
        // backgroundColor: "white"
    },
    userDescContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    userEmail: {
        color: '#7f7f7f',
        fontSize: 14,
    },
    userImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    userName: {
        marginTop: 20,
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        letterSpacing: 1,
    },
    settingsIconContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginVertical: 0,
        marginRight: 30,
        // marginBottom: 10
    },
    container: {
        // paddingTop: 25,
        flex: 1,
        backgroundColor: "#fff",

    },
});
