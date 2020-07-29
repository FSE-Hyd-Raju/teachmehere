import React, { Component, Fragment } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    Image,
    Dimensions, AsyncStorage, ActivityIndicator
} from 'react-native';
import { Input, Button, Avatar, ButtonGroup, Icon } from 'react-native-elements';
import Theme from '../../../Theme';
import IconMaterialIcons from 'react-native-vector-icons/Feather';
import AppButton from '../../../components/common/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeProfileSelector,
    clearProfileErrors,
    clearPasswordErrors,
    changeProfileUsernameChanged,
    changeProfileDescriptionChanged,
    onChangePasswordPressed,
    onChangeProfilePressed,
    onChangeImagePressed,
    oldPasswordChanged,
    newPasswordChanged,
} from '../../../redux/slices/changeProfileSlice';
import { loginSelector } from '../../../redux/slices/loginSlice'
import PageSpinner from '../../../components/common/PageSpinner';
import ImagePicker from 'react-native-image-picker';

import * as yup from 'yup';
import { Formik } from 'formik';

export default function ChangeProfilePage({ navigation }) {
    const dispatch = useDispatch();
    const {
        loading,
        changeProfileUsername,
        changeProfileDescription,
        changeProfileUsernameError,
        DescriptionError,
        oldPassword,
        newPassword,
        oldPasswordError,
        newPasswordError,
    } = useSelector(changeProfileSelector);

    const {
        userInfo
    } = useSelector(loginSelector)

    const [hidePassword, sethidePassword] = React.useState(true);

    const [hidePassword2, sethidePassword2] = React.useState(true);

    const [eyeicon, seteyeicon] = React.useState('eye');
    const [eyeicon2, seteyeicon2] = React.useState('eye');

    const [selectedIndex, setSelectedIndex] = React.useState(1)

    const [isImageAvailable, setIsImageAvailable] = React.useState(false);
    const [profilePic, setProfilePic] = React.useState('');
    const [filePath, setFilePath] = React.useState({});
    const [showImage, setShowImage] = React.useState('');


    componentDidMount = () => {
        getImage();
    }

    const getImage = async () => {
        const profilePic = await AsyncStorage.getItem("profilePic");
        if (profilePic) {
            setProfilePic(JSON.parse(profilePic));
            setIsImageAvailable(true);
        }
    }
    chooseFile = () => {
        var options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                // let source = response;
                // You can also display the image using data:

                let source = { uri: 'data:image/jpeg;base64,' + response.data };

                // const { user } = this.props.auth;

                dispatch(
                    onChangeImagePressed({
                        userId: userInfo._id,
                        displaypic: JSON.stringify(source),

                        // showToast: this.showToast,
                        onSuccess: () => {
                            navigation.navigate('Profile');
                        },
                    })
                )
                AsyncStorage.setItem("profilePic", JSON.stringify(source));
                setProfilePic(source)
                setFilePath(source)
                setIsImageAvailable(true)
                // this.setState({
                //     ...this.state,
                //     filePath: source,
                //     profilePic: source,
                //     isImageAvailable: true
                // })

            }
        });
    };

    const toggleEyeIcon = () => {
        if (eyeicon === 'eye') {
            seteyeicon('eye-off');
            sethidePassword(false);
        } else {
            seteyeicon('eye');
            sethidePassword(true);
        }
    };

    const toggleEyeIcon2 = () => {
        if (eyeicon2 === 'eye') {
            seteyeicon2('eye-off');
            sethidePassword2(false);
        } else {
            seteyeicon2('eye');
            sethidePassword2(true);
        }
    };

    const inputComponent = () => {
        return (
            <Formik
                initialValues={{ username: '', description: '' }}
                onSubmit={values =>
                    dispatch(
                        onChangeProfilePressed({
                            id: userInfo._id,
                            username: values.username,
                            description: values.description,
                            onSuccess: () => {
                                navigation.navigate('Profile');
                            },
                        }),
                    )
                }
                // new line
                validationSchema={yup.object().shape({
                    username: yup
                        .string()
                        .min(5)
                        .required(),
                    description: yup
                        .string()
                        .min(10)
                })}>
                {({
                    values,
                    handleChange,
                    errors,
                    setFieldTouched,
                    touched,
                    isValid,
                    handleSubmit,
                }) => (
                        <Fragment>
                            <View style={styles.inputComponentStyle}>
                                <Input
                                    style={{ paddingLeft: 20 }}
                                    placeholder="Username"
                                    leftIcon={
                                        <IconMaterialIcons
                                            name='user'
                                            size={20}
                                        />}

                                    errorMessage={changeProfileUsernameError}
                                    value={values.username}
                                    onChangeText={(e) => {
                                        handleChange("username")(e);
                                        dispatch(clearProfileErrors())
                                    }}
                                    onBlur={() => setFieldTouched('username')}
                                />
                                {touched.username && errors.username &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.username}</Text>
                                }
                                <Input
                                    style={{ paddingLeft: 20 }}
                                    placeholder="Description"
                                    leftIcon={
                                        <IconMaterialIcons
                                            name='user'
                                            size={20}
                                        />}

                                    errorMessage={DescriptionError}
                                    value={values.description}
                                    onChangeText={(e) => {
                                        handleChange("description")(e);
                                        dispatch(clearProfileErrors())
                                    }}
                                    onBlur={() => setFieldTouched('description')}
                                />
                                {touched.description && errors.description &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.description}</Text>
                                }
                            </View>
                            <Button
                                title="Update"
                                disabled={!isValid}
                                type="solid"
                                containerStyle={styles.loginButton}
                                onPress={handleSubmit}
                            />
                        </Fragment>
                    )}
            </Formik>
        );
    };

    const inputComponent2 = () => {
        return (
            <Formik
                initialValues={{ oldpassword: '', newpassword: '' }}
                onSubmit={values =>
                    dispatch(
                        onChangePasswordPressed({
                            id: userInfo._id,
                            oldpassword: values.oldpassword,
                            newpassword: values.newpassword,
                            onSuccess: () => {
                                navigation.navigate('Profile');
                            },
                        }),
                    )
                }
                // new line
                validationSchema={yup.object().shape({
                    oldpassword: yup
                        .string()
                        .min(5)
                        .required(),
                    newpassword: yup
                        .string()
                        .min(5)
                        .required()
                })}>
                {({
                    values,
                    handleChange,
                    errors,
                    setFieldTouched,
                    touched,
                    isValid,
                    handleSubmit,
                }) => (
                        <Fragment>
                            <View style={styles.inputComponentStyle}>
                                <Input
                                    placeholder="Current Password"
                                    secureTextEntry={hidePassword}
                                    leftIcon={<IconMaterialIcons name="lock" size={20} />}
                                    rightIcon={
                                        <IconMaterialIcons
                                            name={eyeicon}
                                            size={20}
                                            margin="10"
                                            onPress={toggleEyeIcon}
                                        />
                                    }
                                    errorMessage={oldPasswordError}
                                    value={values.password}
                                    onChangeText={e => {
                                        handleChange('oldpassword')(e);
                                        dispatch(clearPasswordErrors());
                                    }}
                                    onBlur={() => setFieldTouched('oldpassword')}
                                />
                                {touched.oldpassword && errors.oldpassword && (
                                    <Text style={{ fontSize: 13, color: 'red' }}>
                                        {errors.oldpassword}
                                    </Text>
                                )}
                                <Input
                                    placeholder="New Password"
                                    secureTextEntry={hidePassword2}
                                    leftIcon={<IconMaterialIcons name="lock" size={20} />}
                                    rightIcon={
                                        <IconMaterialIcons
                                            name={eyeicon2}
                                            size={20}
                                            margin="10"
                                            onPress={toggleEyeIcon2}
                                        />
                                    }
                                    errorMessage={newPasswordError}
                                    value={values.newpassword}
                                    onChangeText={e => {
                                        handleChange('newpassword')(e);
                                        dispatch(clearPasswordErrors());
                                    }}
                                    onBlur={() => setFieldTouched('newpassword')}
                                />
                                {touched.newpassword && errors.newpassword && (
                                    <Text style={{ fontSize: 13, color: 'red' }}>
                                        {errors.newpassword}
                                    </Text>
                                )}
                            </View>
                            <Button
                                title="Update"
                                disabled={!isValid}
                                type="solid"
                                containerStyle={styles.loginButton}
                                onPress={handleSubmit}
                            />
                        </Fragment>
                    )}
            </Formik>
        );
    };
    const buttons = ["Edit Profile", "Change Password"]

    const backButtonComponent = () => {
        return (
            <View style={{ alignItems: "flex-start" }}>
                <Icon
                    // raised
                    size={27}
                    style={{ paddingLeft: 2 }}
                    name='arrow-left'
                    type='feather'
                    color='#1E90FF'
                    onPress={() => navigation.goBack()} />
            </View>
        )
    }
    const userImageContainer = () => {
        return (
            <View style={styles.userImageContainer}>

                {/* <Avatar
                    size={250}
                    chevron
                    activeOpacity={0.7}
                    // avatarStyle={{ opacity: 0.7 }}
                    onPress={() => console.log("Works!")}
                    rounded
                    // showEditButton={true}
                    // overlayContainerStyle={{ borderRadius: 20 }}
                    // containerStyle={{ borderRadius: 15 }}
                    // rounded
                    source={{
                        uri:
                            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    }}
                    showEditButton
                    editButton={{
                        name: 'edit', type: 'material'
                    }}

                /> */}
                <Avatar
                    rounded
                    showEditButton
                    size={200}
                    // source={{ uri: 'https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022__340.jpg' }}
                    title='Grace'
                    containerStyle={{ margin: 10 }}
                    // onEditPress={() => console.log('edit button pressed')}
                    // onLongPress={() => console.log('component long pressed')}
                    // onPress={() => console.log('component pressed')}
                    editButton={{
                        name: 'arrow-left', type: 'feather'
                    }}
                    source={profilePic}

                    style={{ width: 200, height: 200 }}

                />
                <View style={{
                    backgroundColor: 'white', position: 'relative',
                    bottom: 75, left: 70, alignItems: 'flex-end',
                    justifyContent: 'flex-end', borderRadius: 30, padding: 10
                }}>

                    <Icon
                        // raised
                        size={40}
                        style={{ margin: 70 }}
                        name='edit'
                        type='material'
                        color='black'
                        onPress={() => chooseFile()} />
                    <ActivityIndicator
                        style={styles.activityIndicator}
                        animating={loading}
                    />
                </View>


                {/* <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon
                        // raised
                        size={27}
                        style={{ paddingLeft: 2 }}
                        name='camera'
                        type='feather'
                        color='#1E90FF'
                        onPress={() => navigation.goBack()} />
                    <Text style={{
                        textShadowColor: 'black',
                        color: 'white',
                        textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 10,
                        fontSize: 20
                    }}>Change  Photo</Text> */}
                {/* </View> */}

            </View >
        )
    }

    return (
        <View style={styles.MainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {backButtonComponent()}
                {userImageContainer()}
                <View style={{ marginTop: 30 }}>
                    <ButtonGroup
                        onPress={index => setSelectedIndex(index)}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{ height: 40, borderRadius: 20 }}
                    />
                </View>
                <View style={{ marginTop: 30 }}>
                    {selectedIndex == 0 && inputComponent()}
                    {selectedIndex == 1 && inputComponent2()}
                </View>

                <PageSpinner visible={loading} />
            </ScrollView>
        </View>
    );
}

const win = Dimensions.get('window');
const ratio = win.width / 3600;

const styles = StyleSheet.create({
    headerComponent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    headerComponentText: {
        fontWeight: 'bold',
        fontSize: 25,
        letterSpacing: 1,
        marginBottom: 20,
    },
    inputComponentStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    backgroundImage: {
        marginTop: 5,
        width: win.width,
        height: 2700 * ratio, //362 is actual height of image
        marginBottom: 30,
    },
    MainContainer: {
        flex: 1,
        backgroundColor: 'rgb(255, 255, 255)',
        padding: 30,
    },
    loginButton: {
        alignSelf: 'center',
        marginVertical: Theme.spacing.small,
        width: '50%',
        borderRadius: 20,
    },
    forgotButton: {
        paddingVertical: Theme.spacing.tiny,
        // paddingRight: Theme.spacing.small,
        marginLeft: 2,
    },
    register: {
        paddingVertical: Theme.spacing.tiny,
        // paddingRight: Theme.spacing.small,
        marginLeft: 7,
    },
    userImageContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
});
