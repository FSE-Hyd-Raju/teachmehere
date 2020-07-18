import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Dimensions } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Theme from '../../../Theme';
import IconMaterialIcons from 'react-native-vector-icons/Feather';
import AppButton from '../../../components/common/AppButton';
import { useDispatch, useSelector } from 'react-redux'
import { loginSelector, clearErrors, loginPasswordChanged, onLoginPressed } from '../../../redux/slices/loginSlice'
import PageSpinner from '../../../components/common/PageSpinner';

import * as yup from 'yup'
import { Formik } from 'formik'


export default function LoginPage({ navigation }) {
    const dispatch = useDispatch()
    const {
        loading,
        loginResponse,
        loginPassword,
        loginPasswordError,
        loginEmail,
        loginEmailError } = useSelector(loginSelector)

    const [hidePassword, sethidePassword] = React.useState(true);
    const [eyeicon, seteyeicon] = React.useState("eye");

    const onForgotPress = () => navigation.navigate("ForgotPassword");
    const onSignupPress = () => navigation.navigate("Signup");

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
            <View style={styles.headerComponent}>
                {/* <Text style={styles.headerComponentText}>Welcome Back!</Text> */}
                <Image
                    style={styles.backgroundImage}
                    source={require('../../../assets/img/login.png')}
                />
            </View>
        )
    }
    const inputComponent = () => {
        return (
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => dispatch(onLoginPressed(
                    {
                        email: values.email,
                        password: values.password,
                        onSuccess: () => {
                            navigation.navigate('Profile');
                        }
                    }
                ))}
                // new line
                validationSchema={yup.object().shape({
                    email: yup
                        .string()
                        .email()
                        .required(),
                    password: yup
                        .string()
                        .min(5)
                        .required(),
                })}>
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <Fragment>
                        <View style={styles.inputComponentStyle}>
                            <Input
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
                                <Text style={{ fontSize: 13, color: 'red' }}>{errors.email}</Text>
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
                                errorMessage={loginPasswordError}
                                value={values.password}
                                onChangeText={(e) => {
                                    handleChange("password")(e);
                                    dispatch(clearErrors())
                                }}
                                onBlur={() => setFieldTouched('password')}
                            />
                            {touched.password && errors.password &&
                                <Text style={{ fontSize: 13, color: 'red' }}>{errors.password}</Text>
                            }

                        </View>
                        <Button title="Signin" disabled={!isValid} type="solid" containerStyle={styles.loginButton} onPress={handleSubmit} />
                    </Fragment>
                )}
            </Formik>
        )
    }
    const buttonComponent = () => {
        return (
            <View>
                <AppButton
                    onlyText
                    style={styles.forgotButton}
                    marginTop='50'
                    marginVertical
                    color="#00008B"
                    onPress={onForgotPress}
                >
                    Forgot password?
                </AppButton>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                    <Text  >Don't have an account?</Text>
                    <AppButton
                        onlyText
                        style={styles.register}
                        color="#00008B"
                        onPress={onSignupPress}
                    >
                        Register
                    </AppButton>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.MainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {headerComponent()}
                {inputComponent()}
                {buttonComponent()}
                <PageSpinner visible={loading} />
            </ScrollView >
        </View>

    );
}


const win = Dimensions.get('window');
const ratio = win.width / 3600;

const styles = StyleSheet.create({
    headerComponent: {
        justifyContent: "center",
        alignItems: "center"
    },
    headerComponentText: {
        fontWeight: 'bold',
        fontSize: 25,
        letterSpacing: 1,
        marginBottom: 20
    },
    inputComponentStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    backgroundImage: {
        marginTop: 5,
        width: win.width,
        height: 2700 * ratio, //362 is actual height of image
        marginBottom: 30
    },
    MainContainer: {
        flex: 1,
        backgroundColor: "rgb(255, 255, 255)",
        padding: 30
    },
    loginButton: {
        alignSelf: 'center',
        marginVertical: Theme.spacing.small,
        width: "50%",
        borderRadius: 20,
    },
    forgotButton: {
        paddingVertical: Theme.spacing.tiny,
        // paddingRight: Theme.spacing.small,
        marginLeft: 2
    },
    register: {
        paddingVertical: Theme.spacing.tiny,
        // paddingRight: Theme.spacing.small,
        marginLeft: 7
    },
});
