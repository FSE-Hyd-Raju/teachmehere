import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Dimensions } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Theme from '../../../Theme';
import IconMaterialIcons from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux'
import {
    clearErrors,
    resetPasswordFailure,
    onforgotPasswordPressed,
    onOtpPressed, resetPasswordSelector
} from '../../../redux/slices/forgotPasswordSlice'
import PageSpinner from '../../../components/common/PageSpinner';

import * as yup from 'yup'
import { Formik } from 'formik'


export default function forgotPasswordPage({ navigation }) {
    const dispatch = useDispatch()
    const {
        loading,
        loginEmailError,
        loginOtpError,
        loginPasswordError } = useSelector(resetPasswordSelector)

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
    const headerComponent = () => {
        return (
            <View style={styles.backgroundText}>
                <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                {/* <Text style={{ fontStyle: '#dddddd', fontSize: 15 }} >Enter the email address associated with this account</Text> */}
                <Image
                    style={styles.backgroundImage}
                    source={require('../../../assets/img/forgotpassword.png')}
                />
            </View>
        )
    }


    const screen1 = () => {
        return (
            <Formik
                initialValues={{ email: '' }}
                onSubmit={values => dispatch(onforgotPasswordPressed(
                    {
                        email: values.email,
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
                    })
                } >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <Fragment>
                        <View style={styles.inputComponentStyle}>
                            <Input
                                style={{ paddingLeft: 20 }}
                                placeholder="Email"
                                leftIcon={{ type: 'Feather', name: 'mail', size: 20 }}
                                errorMessage={loginEmailError}
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
                            <Button title="Submit" disabled={!isValid} type="solid" containerStyle={styles.loginButton} onPress={handleSubmit} />
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
                onSubmit={values => dispatch(onOtpPressed(
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
                                errorMessage={loginOtpError}

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
                                errorMessage={loginPasswordError}
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
            </ScrollView >
        </View>

    );
}

const win = Dimensions.get('window');
const ratio = win.width / 3600;


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 25,
        backgroundColor: "rgb(255, 255, 255)",
    },
    forgotPasswordText: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 5
    },
    backgroundText: {
        justifyContent: "center",
        alignItems: "center"
    },
    backgroundImage: {
        marginTop: 5,
        width: win.width,
        height: 2700 * ratio, //362 is actual height of image
        marginBottom: 10
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
