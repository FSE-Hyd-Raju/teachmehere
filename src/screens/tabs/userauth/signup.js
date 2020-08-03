import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Dimensions } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import Theme from '../../../Theme';
import IconMaterialIcons from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux'
import {
    clearErrors,
    signupFailure,
    onSignupOtpPressed,
    onSignupPressed, signupSelector
} from '../../../redux/slices/signupSlice'
import PageSpinner from '../../../components/common/PageSpinner';

import * as yup from 'yup'
import { Formik } from 'formik'


export default function signupPage({ navigation }) {
    const dispatch = useDispatch()
    const {
        loading,
        signupPasswordError,
        signupEmailError,
        signupPhonenumberError,
        signupUsernameError,
        signupOtpError } = useSelector(signupSelector)

    const [hidePassword, sethidePassword] = React.useState(true);
    const [showOtpScreen, setshowOtpScreen] = React.useState(false);
    const [showEmail, setshowEmail] = React.useState("");

    const [eyeicon, seteyeicon] = React.useState("eye");
    const onSigninPress = () => navigation.navigate('Login');

    const toggleEyeIcon = () => {
        if (eyeicon === "eye") {
            seteyeicon("eye-off")
            sethidePassword(false)
        }
        else {
            seteyeicon("eye")
            sethidePassword(true)
        }
    };

    const hideOtpScreen = () => {
        setshowOtpScreen(false)
        navigation.navigate("Signup")
    }

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
                    onPress={hideOtpScreen} />
            </View>
        )
    }

    const headerComponent = () => {
        return (
            <View>
                {showOtpScreen ? backButtonComponent() : null}
                <View style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, marginTop: 100 }}>Sign up</Text>
                    <Text style={{ color: 'gray', fontSize: 15 }} >Fill the details & create your account</Text>
                </View>
            </View>
        )
    }


    const screen1 = () => {
        return (
            <Formik
                initialValues={{ email: '', username: '', phonenumber: '' }}
                onSubmit={values => dispatch(onSignupPressed(
                    {
                        email: values.email,
                        username: values.username,
                        phonenumber: values.phonenumber,
                        onSuccess: () => {
                            setshowOtpScreen(true)
                            setshowEmail(values.email)
                        }
                    }

                ))}

                // new line
                validationSchema={
                    yup.object().shape({
                        email: yup
                            .string()
                            .email()
                            .required(),
                        phonenumber: yup
                            .number()
                            .required(),
                        username: yup
                            .string()
                            .min(5)
                            .required(),
                    })
                } >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
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

                                errorMessage={signupUsernameError}
                                value={values.username}
                                onChangeText={(e) => {
                                    handleChange("username")(e);
                                    dispatch(clearErrors())
                                }}
                                onBlur={() => setFieldTouched('username')}
                            />
                            {touched.username && errors.username &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.username}</Text>
                            }

                            <Input
                                style={{ paddingLeft: 20 }}
                                placeholder="Email"
                                leftIcon={{ type: 'Feather', name: 'mail', size: 20 }}
                                errorMessage={signupEmailError}
                                value={values.email}
                                onChangeText={(e) => {
                                    handleChange("email")(e);
                                    dispatch(clearErrors())
                                }}
                                onBlur={() => setFieldTouched('email')}
                            />
                            {touched.email && errors.email &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                            }

                            <Input
                                style={{ paddingLeft: 20 }}
                                placeholder="Phonenumber"
                                leftIcon={
                                    <IconMaterialIcons
                                        name='phone'
                                        size={20}
                                    />}
                                value={values.phonenumber}
                                errorMessage={signupPhonenumberError}
                                onChangeText={(e) => {
                                    handleChange("phonenumber")(e);
                                    dispatch(clearErrors())
                                }}
                                onBlur={() => setFieldTouched('phonenumber')}
                            />
                            {touched.phonenumber && errors.phonenumber &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.phonenumber}</Text>
                            }

                            <Button title="Signup" disabled={!isValid} type="solid" containerStyle={styles.loginButton} onPress={handleSubmit} />
                            <PageSpinner visible={loading} />
                        </View>
                    </Fragment>
                )
                }
            </Formik >


        )

    }

    const screen2 = () => {
        return (
            <Formik
                initialValues={{ otp: '', password: '' }}
                onSubmit={values => dispatch(onSignupOtpPressed(
                    {
                        otp: values.otp,
                        password: values.password,
                        email: showEmail,
                        onSuccess: () => {
                            navigation.navigate('Profile');
                        }
                    }

                ))}

                // new line
                validationSchema={
                    yup.object().shape({
                        otp: yup
                            .number()
                            .required(),
                        password: yup
                            .string()
                            .min(5)
                            .required(),
                    })
                } >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <Fragment>
                        <View style={styles.inputComponentStyle}>
                            <Input
                                style={{ paddingLeft: 20 }}
                                placeholder="OTP"
                                leftIcon={
                                    <IconMaterialIcons
                                        name='key'
                                        size={20}
                                    />}
                                errorMessage={signupOtpError}

                                value={values.otp}
                                onBlur={() => setFieldTouched('otp')}
                                onChangeText={(e) => {
                                    handleChange("otp")(e);
                                    dispatch(clearErrors())
                                }}
                            />
                            {touched.otp && errors.otp &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.otp}</Text>
                            }
                            <Input
                                placeholder="Password"
                                secureTextEntry={hidePassword}
                                leftIcon={
                                    <IconMaterialIcons
                                        name='lock'
                                        size={20}
                                    />}
                                rightIcon={<IconMaterialIcons name={eyeicon} size={20} margin="10" onPress={toggleEyeIcon} />}
                                onChangeText={(e) => {
                                    handleChange("password")(e);
                                    dispatch(clearErrors())
                                }}
                                onBlur={() => setFieldTouched('password')}
                                errorMessage={signupPasswordError}
                            />
                            {touched.password && errors.password &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                            }

                            <Button title="Submit" disabled={!isValid} type="solid" containerStyle={styles.loginButton} onPress={handleSubmit} />
                            <PageSpinner visible={loading} />
                        </View>
                    </Fragment>
                )
                }
            </Formik >
        )

    }

    return (
        <View style={styles.MainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {headerComponent()}
                {!showOtpScreen ? screen1() : null}
                {showOtpScreen ? screen2() : null}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                    }}>
                    <Text>Already have an account?</Text>
                    <Button title="Signin" type="clear" containerStyle={styles.signin} onPress={onSigninPress} />
                </View>
            </ScrollView >
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 25,
        backgroundColor: "rgb(255, 255, 255)",
    },
    signin: {
        paddingVertical: Theme.spacing.tiny,
        // paddingRight: Theme.spacing.small,
        marginLeft: 7,
    },
    inputComponentStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 30
    },
    MainContainer: {
        // Setting up View inside content in Vertically center.
        flex: 1,
        padding: 30,
        backgroundColor: "rgb(255, 255, 255)",

    },
    loginButton: {
        alignSelf: 'center',
        marginVertical: Theme.spacing.small,
        width: "50%",
        borderRadius: 20,
    },
});
