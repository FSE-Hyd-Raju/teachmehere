import React, { useEffect, useRef } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, TouchableHighlight, FlatList, BackHandler, TouchableWithoutFeedback, Keyboard, Dimensions, ScrollView } from 'react-native';
import { Searchbar, ActivityIndicator, Colors, Button, Title, Caption, Paragraph, List, Surface } from 'react-native-paper';
import { Icon, Header, Avatar, ListItem } from 'react-native-elements';
import IconMaterialIcons from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function ProfileSettingsPage({ navigation }) {
    const [showSettingsPage, setShowSettingsPage] = React.useState(true);

    useEffect(() => {
        // let backhandler = BackHandler.addEventListener(
        //     'hardwareBackPress',
        //     function () {
        //         if (navigation) {
        //             navigation.goBack()
        //             return true;
        //         }
        //         return false;
        //     },
        // );
        // return () => {
        //     backhandler.remove();
        // };
    }, []);

    const settingsPageComponent = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.settingsContainer}>
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
                            <Text style={styles.headerTitle}>App Settings</Text>
                        </View>
                    </View>
                    <View style={styles.accountContainer}>
                        <Text style={styles.accountContainerTitle}>Account</Text>
                        <TouchableOpacity>
                            <ListItem
                                title={"Change Profile"}
                                leftIcon={<Icons
                                    name={"account-circle-outline"}
                                    color="rgb(102, 94, 94)"
                                    size={25}
                                />}
                                pad={30}
                                titleStyle={{ letterSpacing: 1 }}
                                containerStyle={{ backgroundColor: 'unset' }}
                                chevron={<Icons
                                    name={"chevron-right"}
                                    color="rgb(102, 94, 94)"
                                    size={25}
                                />}
                            // onPress={() => console.log("yep")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <ListItem
                                title={"logout"}
                                leftIcon={<Icons
                                    name={"logout"}
                                    color="rgb(102, 94, 94)"
                                    size={25}
                                />}
                                pad={30}
                                titleStyle={{ letterSpacing: 1 }}
                                containerStyle={{ backgroundColor: 'unset' }}
                                chevron={<Icons
                                    name={"chevron-right"}
                                    color="rgb(102, 94, 94)"
                                    size={25}
                                />}
                            // onPress={() => console.log("yep")}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.accountContainer}>
                        <Text style={styles.accountContainerTitle}>Help And Support</Text>
                        <View style={styles.accountContainerBody}>
                            <TouchableOpacity>
                                <Surface style={styles.surface}>
                                    <Icons
                                        name={"file-document-edit-outline"}
                                        color="rgb(102, 94, 94)"
                                        size={iconSize}
                                    />
                                    <Text style={styles.accountsText}>Feedback</Text>
                                </Surface>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Surface style={styles.surface}>
                                    <Icons
                                        name={"message-outline"}
                                        color="rgb(102, 94, 94)"
                                        size={18}
                                    />
                                    <Text style={styles.accountsText}>Chat With Us</Text>
                                </Surface>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={[styles.accountContainer, { marginTop: 10 }]}>
                        <Text style={styles.accountContainerTitle}>About</Text>
                        <View style={styles.accountContainerBody}>
                            <TouchableOpacity>
                                <Surface style={styles.surface}>
                                    <Icons
                                        name={"cellphone-arrow-down"}
                                        color="rgb(102, 94, 94)"
                                        size={iconSize}
                                    />
                                    <Text style={styles.accountsText}>Version</Text>
                                    <Text style={{}}>1.0.0</Text>

                                </Surface>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Surface style={styles.surface}>
                                    <Icons
                                        name={"star-circle-outline"}
                                        color="rgb(102, 94, 94)"
                                        size={iconSize}
                                    />
                                    <Text style={styles.accountsText}>Rate us</Text>
                                </Surface>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Surface style={styles.surface}>
                                    <Icons
                                        name={"share-variant"}
                                        color="rgb(102, 94, 94)"
                                        size={iconSize}
                                    />
                                    <Text style={styles.accountsText}>Invite friends</Text>
                                </Surface>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Surface style={styles.surface}>
                                    <Icons
                                        name={"security"}
                                        color="rgb(102, 94, 94)"
                                        size={iconSize}
                                    />
                                    <Text style={styles.accountsText}>Privacy policy</Text>
                                </Surface>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }

    return (
        <View>
            {settingsPageComponent()}
        </View>

    );
}
const iconSize = 20;

const styles = StyleSheet.create({
    settingsContainer: {
        margin: 20
    },
    accountsText: {
        // fontSize: 10,
        letterSpacing: 1,
        textAlign: "center",
        marginTop: 10
        // margin: 20
    },
    accountContainerBody: {
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    accountContainerTitle: {
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 1,
        marginBottom: 10

    },
    accountContainer: {
        marginTop: 30,
    },
    surface: {
        margin: 20,
        marginTop: 5,
        padding: 18,
        height: 100,
        width: 110,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "rgb(225, 225, 225)",
        // backgroundColor: "white",
        // elevation: 2,
        // boxShadow: "rgba(0, 0, 0, 0.24) 0 0.75 1.5"
        // backgroundColor: "unset"
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
