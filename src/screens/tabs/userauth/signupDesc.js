import React, { Fragment } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput } from 'react-native';
import { Button, Icon, Avatar } from 'react-native-elements';
import Theme from '../../../Theme';
import { useDispatch, useSelector } from 'react-redux'
import { signupSelector } from '../../../redux/slices/signupSlice'
import PageSpinner from '../../../components/common/PageSpinner';
import * as yup from 'yup'
import { Formik } from 'formik'
// import ImagePicker from 'react-native-image-picker';
import { changeProfileSelector, clearProfileErrors, onChangeProfilePressed } from '../../../redux/slices/changeProfileSlice';
import { loadUserInfo, loginSelector } from '../../../redux/slices/loginSlice'

export default function signupDescPage({ navigation }) {

    const dispatch = useDispatch()
    const { userInfo } = useSelector(loginSelector)
    const { loading } = useSelector(signupSelector)
    const { DescriptionError } = useSelector(changeProfileSelector);
    const [sourceImage, setSource] = React.useState({});

    const chooseFile = async () => {
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
                let imgSource = { uri: 'data:image/jpeg;base64,' + response.data };
                setSource(imgSource)
            }
        });
    };


    const descriptionComponent = () => {

        const onsubmit = (values) => {
            dispatch(
                onChangeProfilePressed({
                    id: userInfo._id,
                    displaypic: sourceImage.uri,
                    description: values.description,
                    username: userInfo.username,
                    onSuccess: (data) => {
                        dispatch(loadUserInfo(data))
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Profile' }],
                        });


                    },
                }),
            )
        }
        return (
            <Formik
                initialValues={{ description: '' }}
                onSubmit={values => onsubmit(values)}
                validationSchema={yup.object().shape({
                    description: yup
                        .string()
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
                            <View >
                                <TextInput
                                    style={{
                                        borderBottomColor: '#000000',
                                        borderBottomWidth: 1,
                                    }}
                                    placeholder="Tell others about yourself"
                                    multiline
                                    numberOfLines={4}
                                    errorMessage={DescriptionError}
                                    value={values.description}
                                    onChangeText={(e) => {
                                        handleChange("description")(e);
                                        dispatch(clearProfileErrors())
                                    }}
                                // onBlur={() => setFieldTouched('description')}
                                />
                                {touched.description && errors.description &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.description}</Text>
                                }
                            </View>
                            <Button
                                title="Submit"
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

    const footerComponent = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 10,
                    marginHorizontal: 25
                }}>
                <Text numberOfLines={2}>If you want to fill them later!</Text>
                <Button title="Skip" type="clear" containerStyle={styles.register} onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: 'Profile' }],
                })} />
            </View>
        )
    }

    const userImageContainer = () => {
        return (
            <View style={styles.userImageContainer}>
                <Avatar
                    rounded
                    // showEditButton
                    size={150}
                    title=''
                    // containerStyle={{ margin: 10 }}
                    containerStyle={{ borderColor: "lightgrey", borderWidth: 1, padding: 10 }}
                    // editButton={{
                    //     name: 'arrow-left', type: 'feather'
                    // }}
                    // style={{ width: 200, height: 200 }}
                    // source={{ uri: sourceImage.uri }}
                    source={sourceImage.uri ? { uri: sourceImage.uri } : require('../../../assets/img/default-mask-avatar.png')}

                />
                <View style={{
                    backgroundColor: 'white', position: 'relative',
                    bottom: 60, left: 65, alignItems: 'flex-end',
                    justifyContent: 'flex-end', borderRadius: 40, padding: 10
                }}>
                    <Icon
                        // raised
                        size={30}
                        style={{ margin: 70 }}
                        name='edit'
                        type='material'
                        color='black'
                        onPress={() => chooseFile()} />
                    {/* <ActivityIndicator
                        style={styles.activityIndicator}
                        animating={loading}
                    /> */}
                </View>

                {/* <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                    marginBottom: 35
                }}>
                    <Text style={{ color: 'gray', fontSize: 15, textAlign: "center", letterSpacing: 0 }} >If you want to teach any skill, let others know about your skills </Text>
                </View> */}
            </View >
        )
    }

    const headerComponent = () => {
        return (
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                marginBottom: 50,
            }}>
                <Text style={{ fontSize: 20, color: "black", letterSpacing: 1, fontWeight: "bold" }}>Add your details</Text>
            </View>
        )
    }

    return (
        <View style={styles.MainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {headerComponent()}
                    {userImageContainer()}
                    {descriptionComponent()}
                    {footerComponent()}
                </View>
                <PageSpinner visible={loading} />
            </ScrollView >
        </View>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        padding: 30,
        backgroundColor: "rgb(255, 255, 255)"
    },
    loginButton: {
        alignSelf: 'center',
        // marginVertical: Theme.spacing.small,
        marginVertical: 35,
        width: 180,
        borderRadius: 20
    },
    userImageContainer: {
        justifyContent: "center",
        alignItems: "center",
    }
});
