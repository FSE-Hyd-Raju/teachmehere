import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
    loginUsernameChanged,
    loginPasswordChanged,
    loginUser,
} from '../../actions';
import { AppButton, PageSpinner } from '../../components/common';
import AppToast from '../../components/AppToast';
import LoginInput from '../../components/LoginInput';
import { RESET_PASSWORD_URL } from '../../api/urls';
import { safeOpenURL } from '../../utils/network';
import RouteNames from '../../RouteNames';
import Theme from '../../Theme';

class AuthSignup extends React.Component {
    static navigationOptions = () => ({
        title: 'Signup',
    });

    onToastRef = ref => (this.toast = ref);
    onForgotPress = () => safeOpenURL(RESET_PASSWORD_URL);
    onUsernameTextChange = text => this.props.loginUsernameChanged(text);
    onPasswordTextChange = text => this.props.loginPasswordChanged(text);

    onUsernameTextChange = text => this.props.loginUsernameChanged(text);
    onEmailTextChange = text => this.props.loginPasswordChanged(text);
    onPhoneNumberTextChange = text => this.props.loginUsernameChanged(text);

    onSignUpPress = () => {
        const { loginUsername, loginPassword, navigation } = this.props;

        this.props.loginUser({
            username: loginUsername,
            password: loginPassword,
            showToast: this.showToast,
            onSuccess: () => {
                navigation.navigate(RouteNames.HomeStack);
            },
        });
    };

    showToast = message => this.toast.show(message, 2000);

    render() {
        const {
            signupUsername,
            signupUsernameError,
            signupPassword,
            signupPasswordError,
            signupIsLoading,
            signupEmail,
            signupEmailError,
            signupPhoneNumber,
            signupPhoneNumberError,
            signupOTP,
            signupOTPError


        } = this.props;

        return (

            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContentContainer}>

                    <LoginInput
                        label="Username"
                        style={styles.input}
                        subtext={signupUsernameError}
                        error={signupUsernameError.length > 0}
                        value={signupUsername}
                        onChangeText={this.onUsernameTextChange}
                    />
                    <LoginInput
                        label="Email"
                        style={styles.input}
                        subtext={signupEmailError}
                        error={signupEmailError.length > 0}
                        value={signupEmail}
                        onChangeText={this.onEmailTextChange}
                    />
                    <LoginInput
                        label="PhoneNumber"
                        style={styles.input}
                        subtext={signupPhoneNumberError}
                        error={signupPhoneNumberError.length > 0}
                        value={signupPhoneNumber}
                        onChangeText={this.onPhoneNumberTextChange}
                    />
                    {/* <LoginInput
                        secureTextEntry
                        label="Password"
                        textContentType="password"
                        style={styles.input}
                        subtext={loginPasswordError}
                        error={loginPasswordError.length > 0}
                        value={loginPassword}
                        onChangeText={this.onPasswordTextChange}
                    /> */}
                    <AppButton style={styles.signupButton} onPress={this.onSignupPress}>
                        Signup
          </AppButton>
                </ScrollView>

                <AppToast refProp={this.onToastRef} />
                <PageSpinner visible={signupIsLoading} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    scrollContentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Theme.spacing.small,
    },
    input: {
        marginTop: Theme.spacing.tiny,
    },
    signupButton: {
        alignSelf: 'stretch',
        marginVertical: Theme.spacing.tiny,
    },
});

const mapStateToProps = ({ auth }) => auth;

export default connect(
    mapStateToProps,
    {
        loginUsernameChanged,
        loginPasswordChanged,
        loginUser,
    },
)(AuthSignup);
