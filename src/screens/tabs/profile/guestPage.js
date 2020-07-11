import React, { useEffect, useRef } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, FlatList, BackHandler, TouchableWithoutFeedback, Keyboard, Dimensions, ScrollView } from 'react-native';
import { Searchbar, ActivityIndicator, Colors, Button, Title, Caption, Paragraph, List, Surface } from 'react-native-paper';
import { Icon, Header, Avatar, ListItem } from 'react-native-elements';
import IconMaterialIcons from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileSettingsPage from './profileSettingsPage';
import RequestedCoursesPage from './requestedCourses';
import WishlistCoursesPage from './wishlistCourses';
import PostedCoursesPage from './postedCourses';


export default function GuestPage({navigation}) {
    const [showSettingsPage, setShowSettingsPage] = React.useState(false);

    useEffect(() => {

    }, []);


    const settingsIconContainer = () => {
        return (
            <View style={styles.settingsIconContainer}>
                  <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')}>
                    <IconMaterialIcons
                        name={"settings"}
                        color="rgb(102, 94, 94)"
                        size={25}
                    // onPress={() => console.log("yep")}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const userImageContainer = () => {
        return (
            <View style={styles.userImageContainer}>
                <Avatar
                    size="xlarge"
                    chevron
                    activeOpacity={0.7}
                    onPress={() => console.log("Works!")}
                   containerStyle={{width:'100%' , height: 280}}
                    // rounded
                    showEditButton={true}
                    // overlayContainerStyle={{ borderRadius: 20 }}
                    // containerStyle={{ borderRadius: 15 }}
                    // rounded
                    source={
                        
                          require("../../../assets/img/guestpage.png")
                    }
                />
       
            </View>
        )
    }

    const userDescContainer = () => {
        return (
            <View style={styles.userDescContainer}>
                {/* <Text numberOfLines={2} style={styles.userDesc}>Software developer and co-founder of TAGIdeas  </Text> */}
            </View>
        )
    }

    const userPagesContainer = (title, icon, route) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate(route)}>
                <ListItem
                    title={title}
                    leftIcon={<Icons
                        name={icon}
                        // color="#28a745"
                        // color={styles.loginButton}
                        titleStyle={{ letterSpacing: 1 }}
                    containerStyle={{ backgroundColor: '7f7f7f' }}
                        size={25}
                        
                    />}
                    // pad={30}
                    // titleStyle={{ letterSpacing: 1 }}
                    // containerStyle={{ backgroundColor: 'unset' }}
                    // chevron={<Icons
                    //     name={"chevron-right"}
                    //     color="rgb(102, 94, 94)"
                    //     size={25}
                    // />}
                // onPress={() => navigation.navigate(route)}
                />
            </TouchableOpacity>
        )
    }

    const profilepagecomponent = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {settingsIconContainer()}
                    <View style={styles.upperContainer}>
                        {userImageContainer()}
                        {userDescContainer()}
                    </View>
                    <View style={styles.lowerContainer}>
                        {/* {userPagesContainer("Requested Courses", "send-circle-outline", 'RequestedCourses')}
                        {userPagesContainer("Posted Courses", "plus-circle-outline", 'PostedCourses')}
                        {userPagesContainer("Wishlist Courses", "heart-outline", 'WishlistCourses')} */}
                        {userPagesContainer("Login",'', 'Login')}
                        {userPagesContainer("Signup",'', 'Signup')}

                    </View>
                </View>
            </ScrollView>
        )
    }

    return (
        <View>
            {profilepagecomponent()}
        </View>

    );
}

const styles = StyleSheet.create({
    lowerContainer: {
        margin: 130,
        // width: "75%",
        // paddingLeft: "1%",
        // textAlign:"left",
        // justifyContent: "left",
        // color:'#7f7f7f',
        // width: "100%",
        // paddingRight: 100
    },
    statText: {
        textAlign: "center",
        color: "#7f7f7f",
        letterSpacing: 1,
    },
    statValue: {
        fontSize: 25,
        fontWeight: "bold",
    },
    loginButton:{
        color:'#28a745'
    },
    stat: {
        alignItems: "center",
        flexWrap: "wrap",
        // flex: 0.3,
        width: "25%",
        paddingLeft: "1%",
    },
    userStatsContainer: {
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginHorizontal: 0,
        marginLeft: "5%",
        marginTop: 40,
    },
    userDesc: {
        borderRadius: 20,
        // borderWidth: 1,
        backgroundColor: "rgba(255, 213, 87, 0.63)",
        // backgroundColor: "#ffd557",
        // marginHorizontal: 40,
        height: 75,
        width: 280,
        textAlign: "center",
        paddingVertical: 15,
        paddingHorizontal: 30,
        letterSpacing: 1,
        lineHeight: 20
    },
    userDescContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    userEmail: {
        color: "#7f7f7f",
        fontSize: 14
    },
    userImageContainer: {
        // justifyContent: "center",
        // alignItems: "center",
        // width:'80%',
    },
    upperContainer:{  
        marginTop: 30,
    },
    userName: {
        marginTop: 20,
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: "sans-serif",
        letterSpacing: 1
    },
    settingsIconContainer: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginVertical: 0,
        marginRight: 30,
        // marginBottom: 10
    },
    container: {
        paddingTop: 30,
    }

});
