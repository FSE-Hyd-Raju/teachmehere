import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Dimensions } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import Theme from '../../../Theme';
import IconMaterialIcons from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux'
import {
    clearErrors,
    resetPasswordFailure,
    onforgotPasswordPressed,
    onOtpPressed, forgotPasswordSelector
} from '../../../redux/slices/forgotPasswordSlice'
import PageSpinner from '../../../components/common/PageSpinner';
import * as yup from 'yup'
import { Formik } from 'formik';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function forgotPasswordOtpPage({ navigation }) {
    const dispatch = useDispatch()
    const {
        loading,
        loginEmailError,
        loginOtpError,
        loginPasswordError, forgotPasswordFormObj } = useSelector(forgotPasswordSelector)

    const [hidePassword, sethidePassword] = React.useState(true);
    const [showOtpScreen, setshowOtpScreen] = React.useState(true);
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
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                marginBottom: 35,
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons
                        name={"keyboard-backspace"}
                        size={27}
                        color={"grey"}
                    />
                </TouchableOpacity>
                <View style={{ justifyContent: "flex-end", flex: 0.9, marginLeft: 10 }}>
                    <Text style={{ fontSize: 20, color: "grey", letterSpacing: 1, textAlign: "center" }}>Veirfy Account</Text>
                </View>
            </View>
        )
    }

    const imageContainer = () => {
        return (
            <View>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Image
                        style={styles.backgroundImage}
                        resizeMode={'stretch'}
                        source={require('../../../assets/img/otpscreen.png')}
                    />
                </View>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                    marginBottom: 35
                }}>
                    <Text style={{ color: 'gray', fontSize: 15, textAlign: "center", letterSpacing: 0, marginHorizontal: 10 }} >Please enter the OTP sent to your email {forgotPasswordFormObj.Email} and the new password</Text>
                </View>
            </View>
        )
    }


    const inputContainer = () => {
        const submitClicked = (values) => {
            dispatch(onOtpPressed(
                {
                    otp: values.OTP,
                    password: values.Password,
                    email: forgotPasswordFormObj.Email,
                    onSuccess: () => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Profile' }],
                        });
                    }
                }

            ))
        }
        return (
            <Formik
                initialValues={{ OTP: '', Password: '' }}
                onSubmit={values => submitClicked(values)}
                validationSchema={
                    yup.object().shape({
                        OTP: yup
                            .number()
                            .required(),
                        Password: yup
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
                                containerStyle={{ width: 310 }}
                                leftIconContainerStyle={{ paddingRight: 15 }}
                                inputStyle={{ fontSize: 16 }}
                                value={values.OTP}
                                onBlur={() => setFieldTouched('OTP')}
                                onChangeText={(e) => {
                                    handleChange("OTP")(e);
                                    dispatch(clearErrors())
                                }}
                            />
                            {touched.OTP && errors.OTP &&
                                <Text style={{ fontSize: 12, color: 'red', textAlign: "center", marginTop: -15 }}>{errors.OTP}</Text>
                            }
                            <Input
                                placeholder="New Password"
                                secureTextEntry={hidePassword}
                                leftIcon={
                                    <IconMaterialIcons
                                        name='lock'
                                        size={20}
                                    />}
                                rightIcon={<IconMaterialIcons name={eyeicon} size={20} margin="10" onPress={toggleEyeIcon} />}
                                onChangeText={(e) => {
                                    handleChange("Password")(e);
                                    dispatch(clearErrors())
                                }}
                                containerStyle={{ width: 310 }}
                                leftIconContainerStyle={{ paddingRight: 15 }}
                                inputStyle={{ fontSize: 16 }}
                                onBlur={() => setFieldTouched('Password')}
                                errorMessage={loginPasswordError}
                            />
                            {touched.Password && errors.Password &&
                                <Text style={{ fontSize: 12, color: 'red', textAlign: "center", marginTop: -15 }}>{errors.Password}</Text>
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
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}>
                {headerComponent()}
                {imageContainer()}
                {inputContainer()}
            </ScrollView >
        </View>
    );

}


const styles = StyleSheet.create({
    backgroundImage: {
        marginTop: 5,
        width: 200,
        height: 200,
        marginBottom: 10
    },
    inputComponentStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 30
    },
    MainContainer: {
        padding: 30,
        backgroundColor: "#fff",
        flex: 1
    },
    loginButton: {
        alignSelf: 'center',
        marginVertical: Theme.spacing.small,
        width: "50%",
        borderRadius: 20,
    },
});
