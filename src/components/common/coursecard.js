import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Card, Avatar, Badge, Icon, Rating } from 'react-native-elements';
import moment from 'moment';


const bodyComponent = (course, wishlistClicked) => {
    return (
        <View style={styles.body}>
            {bodyTextContentComponent(course, wishlistClicked)}
            {avatarComponent(course)}
        </View>
    )
}

const bodyTextContentComponent = (course, wishlistClicked) => {
    return (
        <View style={styles.bodyContent}>
            <View style={styles.wishAndText}>
                {/* <View style={styles.whishlistIcon}>
                    <Icon
                        size={20}
                        name='heart-o'
                        type='font-awesome'
                        onPress={wishlistClicked} />
                </View> */}
                <View style={styles.textContent}>
                    <Text style={styles.courseName} numberOfLines={2}
                    >{course.coursename}</Text>
                    <Text style={{}}> {course.courselevel} </Text>
                </View>
            </View>
            <View style={styles.priceGrid}>
                <View style={styles.oneOnOnePrice}>
                    <Text style={styles.oneOnOneText}>One on One</Text>
                    <Text style={styles.price}>${course.price?.oneonone}</Text>
                </View>
                <View style={styles.groupPrice}>
                    <Text style={styles.groupText}>Group of {course.price?.group?.members}</Text>
                    <Text style={styles.price}>${course.price?.group?.price}/person</Text>
                </View>
            </View>
        </View>
    )
}

const avatarComponent = (course) => {
    return (
        <View style={styles.imageContent}>
            <View>
                <Avatar
                    rounded
                    source={course.displaypic ? { uri: course.displaypic } : require('../../assets/img/default-mask-avatar.png')}
                    // source={{
                    //     uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                    // }}
                    size="medium" />
                <Badge
                    status={course.status != 'ACTIVE' ? "success" : "warning"}
                    containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                />
            </View>
            <Text style={styles.userName} numberOfLines={1}>{course.username}</Text>
            <Rating imageSize={12} readonly startingValue={course.avgrating} style={styles.rating} />

        </View>
    )
}

const footerComponent = (course) => {
    return (
        <View style={styles.footer}>
            <View style={[styles.footerContent, styles.footerCourse, styles.footerBorderLine]}>
                <Text style={styles.footerTextHeader} numberOfLines={1}> Skill Duration</Text>
                <Text > {course.totalhours} hours</Text>
            </View>
            <View style={[styles.footerContent, styles.footerExp]}>
                <Text style={styles.footerTextHeader} numberOfLines={1}> Experience</Text>
                <Text > {course.experience} yrs</Text>
            </View>
            {/* <View style={[styles.footerContent, styles.footerUpdatedDate]}>
                <Text style={[styles.footerTextHeader, styles.footerText]} numberOfLines={1}> Posted On</Text>
                <Text style={[styles.footerText, styles.footerUpdatedDateText]} numberOfLines={1}
                > {moment(course.updateddate).fromNow()}</Text>
            </View> */}
        </View>
    )
}

const courseClickedd = () => {
    console.log("clickedddd")
}

export default function CourseCard({ course, courseClicked, wishlistClicked }) {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                style={styles.recentSearchsItem}
                onPress={courseClicked}
            >
                <Card containerStyle={styles.cardContent}>
                    {bodyComponent(course, wishlistClicked)}
                    {footerComponent(course)}
                </Card>
            </TouchableWithoutFeedback>
        </View >
    );
}

const cardHeight = 170;
const bodyHeight = 115;
const footerHeight = 45;
const bodyContentWidth = 0.7;
const imageContentWidth = 0.3;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff'
        // margin: 5,
        marginBottom: 20
    },
    cardContent: {
        minHeight: cardHeight,
        height: cardHeight,
        padding: 0,
        margin: 5,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        // borderBottomRightRadius: 20,
        elevation: 5

        // marginBottom: 20
    },
    body: {
        flexDirection: 'row',
        minHeight: bodyHeight
    },
    footer: {
        minHeight: footerHeight,
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    footerContent: {
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerCourse: {
        // width: '39%',
        flex: 0.5,
        overflow: 'hidden',
        maxHeight: footerHeight
    },
    footerExp: {
        // width: '28%',
        flex: 0.5,
        overflow: 'hidden',
        maxHeight: footerHeight
    },
    footerUpdatedDate: {
        width: '33%',
        maxHeight: footerHeight
    },
    footerUpdatedDateText: {
        paddingLeft: 5
    },
    footerBorderLine: {
        borderRightWidth: 1,
        borderRightColor: "#b6b6b6",
        borderStyle: "dashed",
        borderRadius: 1,
    },
    footerText: {
        overflow: 'hidden',
    },
    footerTextHeader: {
        fontWeight: "bold"
    },
    bodyContent: {
        flex: bodyContentWidth,
        overflow: 'hidden',
        maxHeight: bodyHeight
    },
    whishlistIcon: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        flex: 0.2
    },
    wishAndText: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    textContent: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        flex: 0.8
    },
    courseName: {
        fontSize: 16,
        // fontVariant: ["small-caps"],
        fontWeight: "bold"
    },
    imageContent: {
        flex: imageContentWidth,
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        maxHeight: bodyHeight
    },
    userName: {
        fontVariant: ['small-caps']
    },
    displayPic: {
        height: 50,
        width: 50,
        "borderWidth": 1,
        "borderColor": "#726b6b",
        "borderStyle": "solid",
        "borderTopLeftRadius": 39,
        "borderTopRightRadius": 39,
        "borderBottomRightRadius": 39,
        "borderBottomLeftRadius": 39
    },
    price: {
        "fontSize": 15,
        "fontFamily": "sans-serif",
        "color": "#719618"
    },
    priceGrid: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    oneOnOnePrice: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    oneOnOneText: {
        fontSize: 13
    },
    groupText: {
        fontSize: 13
    },
    groupPrice: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
    }

});
