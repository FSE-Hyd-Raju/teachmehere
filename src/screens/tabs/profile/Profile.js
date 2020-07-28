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
import { loadUserInfo, loginSelector } from '../../../redux/slices/loginSlice';


export default function Profile({ navigation }) {
    const dispatch = useDispatch();
    const { loading, userInfo } = useSelector(loginSelector);
    const [showSettingsPage, setShowSettingsPage] = React.useState(false);

    useEffect(() => { }, []);

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
                    onPress={() => console.log('Works!')}
                    rounded
                    showEditButton={true}
                    // overlayContainerStyle={{ borderRadius: 20 }}
                    // containerStyle={{ borderRadius: 15 }}
                    // rounded
                    source={{
                        uri:
                            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    }}
                />
                <Text style={styles.userName}>{userInfo.email}</Text>
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
                    <Text style={styles.statValue}>10</Text>
                    <Text style={styles.statText}>Requested {'\n'}courses</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statValue}>3</Text>
                    <Text style={styles.statText}>Posted {'\n'}courses</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statValue}>8</Text>
                    <Text style={styles.statText}>Wishlist {'\n'}courses</Text>
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
                <View style={styles.container}>
                    {settingsIconContainer()}
                    <View style={styles.upperContainer}>
                        {userImageContainer()}
                        {userDescContainer()}
                        {userStatsContainer()}
                    </View>
                    <View style={styles.lowerContainer}>
                        {/* {userPagesContainer("Requested Courses", "send-circle-outline", 'RequestedCourses')}
                        {userPagesContainer("Posted Courses", "plus-circle-outline", 'PostedCourses')}
                        {userPagesContainer("Wishlist Courses", "heart-outline", 'WishlistCourses')} */}
                        {userPagesContainer(
                            'Login',
                            'send-circle-outline',
                            'RequestedCourses',
                        )}
                    </View>
                </View>
            </ScrollView>
        );
    };

    return (
        <View>
            {!showSettingsPage ? (
                profilepagecomponent()
            ) : (
                    <ProfileSettingsPage onBack={() => setShowSettingsPage(false)} />
                )
                // <RequestedCoursesPage onBack={() => setShowSettingsPage(false)} />
                // <WishlistCoursesPage onBack={() => setShowSettingsPage(false)} />
                // <PostedCoursesPage onBack={() => setShowSettingsPage(false)} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    lowerContainer: {
        margin: 30,
        justifyContent: 'center',
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
        marginTop: 40,
    },
    userDesc: {
        borderRadius: 20,
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
        paddingTop: 30,
    },
});
