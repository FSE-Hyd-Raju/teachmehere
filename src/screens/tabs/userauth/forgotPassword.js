import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import Theme from '../../../Theme';
import IconMaterialIcons from 'react-native-vector-icons/Feather';
import AppButton from '../../../components/common/AppButton';
import { useDispatch, useSelector } from 'react-redux'
import {
    signupEmailChanged,
    signupUsernameChanged,
    signupPhonenumberChanged,
    signupOtpChanged,
    signupPasswordChanged,
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
        signupResponse,
        signupPassword,
        signupPasswordError,
        signupEmail,
        signupEmailError,
        signupError,
        signupPhonenumber,
        signupPhonenumberError,
        signupUsername,
        signupUsernameError,
        signupOtp,
        signupOtpError } = useSelector(signupSelector)

    const [hidePassword, sethidePassword] = React.useState(true);
    const [showOtpScreen, setshowOtpScreen] = React.useState(false);
    const [showEmail, setshowEmail] = React.useState("");
    const [eyeicon, seteyeicon] = React.useState("eye");

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
    const onInputChange = (handle) => {
        handle.handle()

    }

    const headerComponent = () => {
        return (
            <View style={{
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{ fontWeight: 'bold', fontSize: 30, marginTop: 100 }}>Sign up</Text>
                <Text style={{ color: 'gray', fontSize: 15 }} >Fill the details & create your account</Text>
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
                        <View style={styles.container}>
                            <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                                <View style={styles.SectionStyle}>
                                    <Input
                                        style={{ paddingLeft: 20 }}
                                        placeholder="Username"
                                        leftIcon={
                                            <IconMaterialIcons
                                                name='user'
                                                size={20}
                                            />}

                                        //   errorStyle={{ color: 'red' }}
                                        // errorMessage={signupUsernameError}
                                        value={values.username}
                                        // onChangeText={(text) => dispatch(loginEmailChanged(text))}
                                        // onChangeText={() => onInputChange({ handle: handleChange("username") })}
                                        onChangeText={handleChange('username')}
                                        onBlur={() => setFieldTouched('username')}
                                    // onChangeText={this.onUsernameTextChange}
                                    />
                                    {/* {touched.username && errors.username &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.username}</Text>
                                    } */}

                                </View>
                                <View style={styles.SectionStyle}>
                                    <Input
                                        style={{ paddingLeft: 20 }}
                                        placeholder="Email"
                                        leftIcon={{ type: 'Feather', name: 'mail', size: 20 }}
                                        //   errorStyle={{ color: 'red' }}
                                        // errorMessage={signupEmailError}
                                        value={values.email}
                                        // onChangeText={(text) => dispatch(loginEmailChanged(text))}
                                        // onChangeText={() => onInputChange({ handle: handleChange("email") })}
                                        onChangeText={handleChange('email')}
                                        onBlur={() => setFieldTouched('email')}
                                    // onChangeText={this.onEmailTextChange}
                                    />
                                    {/* {touched.email && errors.email &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                                    } */}

                                </View>
                                <View style={styles.SectionStyle}>
                                    <Input
                                        style={{ paddingLeft: 20 }}
                                        placeholder="PhoneNumber"
                                        leftIcon={
                                            <IconMaterialIcons
                                                name='phone'
                                                size={20}
                                            />}
                                        value={values.phonenumber}
                                        // onChangeText={(text) => dispatch(loginEmailChanged(text))}
                                        // onChangeText={() => onInputChange({ handle: handleChange("phonenumber") })}
                                        onChangeText={handleChange('phonenumber')}
                                        onBlur={() => setFieldTouched('phonenumber')}
                                    //   errorStyle={{ color: 'red' }}
                                    // errorMessage={signupPhonenumberError}
                                    // onChangeText={this.onPhoneNumberTextChange}
                                    />
                                    {/* {touched.phonenumber && errors.phonenumber &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.phonenumber}</Text>
                                    } */}

                                </View>
                                <AppButton style={styles.loginButton} color="#00008B" marginTop='100' onPress={handleSubmit} >
                                    Signup
                                </AppButton>
                                {/* <AppToast refProp={this.onToastRef} />
                    <PageSpinner visible={signupIsLoading} /> */}
                                <PageSpinner visible={loading} />
                            </ScrollView>
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
                        <View style={styles.container}>
                            <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                                <View style={styles.SectionStyle}>
                                    <Input
                                        style={{ paddingLeft: 20 }}
                                        placeholder="OTP"
                                        leftIcon={
                                            <IconMaterialIcons
                                                name='key'
                                                size={20}
                                            />}
                                        //   errorStyle={{ color: 'red' }}
                                        // errorMessage={signupOtpError}
                                        // value={signupOtp}
                                        //   onChangeText={this.onOTPTextChange}

                                        value={values.otp}
                                        // onChangeText={(text) => dispatch(loginEmailChanged(text))}
                                        // onChangeText={() => onInputChange({ handle: handleChange("otp") })}
                                        onBlur={() => setFieldTouched('otp')}
                                        onChangeText={handleChange('otp')}
                                    // onChangeText={this.onEmailTextChange}
                                    />
                                    {/* {touched.otp && errors.otp &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.otp}</Text>
                                    } */}

                                </View>
                                <View style={styles.SectionStyle}>
                                    <Input
                                        placeholder="Password"
                                        secureTextEntry={hidePassword}
                                        leftIcon={
                                            <IconMaterialIcons
                                                name='lock'
                                                size={20}
                                            />}
                                        rightIcon={<IconMaterialIcons name={eyeicon} size={20} margin="10" />}
                                        onChangeText={handleChange('password')}
                                        onBlur={() => setFieldTouched('password')}
                                    //   errorStyle={{ color: 'red' }}
                                    // errorMessage={signupPasswordError}
                                    // value={signupPassword}
                                    //   onChangeText={this.onPasswordTextChange}
                                    />

                                    {/* {touched.password && errors.password &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                                    } */}
                                </View>
                                <AppButton style={styles.loginButton} color="#00008B" marginTop='100' onPress={handleSubmit}  >
                                    Sumbit
                                </AppButton>
                                {/* <AppToast refProp={this.onToastRef} />
                    <PageSpinner visible={signupIsLoading} /> */}
                            </ScrollView>
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
                {/* <PageSpinner visible={loading} /> */}



            </ScrollView >
        </View>
        // {/* 
        //     <AppToast refProp={this.onToastRef} />
        // <PageSpinner visible={loading} />

    );
}



const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 20,
        backgroundColor: "rgb(255, 255, 255)",
    },
    scrollContentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Theme.spacing.small,
    },
    input: {
        marginTop: Theme.spacing.tiny,
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    MainContainer: {

        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex: 1,
        marginTop: 20,
        backgroundColor: "rgb(255, 255, 255)",

    },
    loginButton: {
        alignSelf: 'center',
        // paddingVertical: Theme.spacing.large,
        marginVertical: Theme.spacing.small,
        width: "75%",
        borderRadius: 20,
        // color:"rgb(20, 169, 201)" 
    },
    forgotButton: {
        paddingVertical: Theme.spacing.tiny,
        paddingHorizontal: Theme.spacing.small,
    },
});
