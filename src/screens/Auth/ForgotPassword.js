import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  loginEmailChanged,
  loginOTPChanged,
  loginPasswordChanged,
  signupUser1,
  signupUser2,
  ResetPassword
} from '../../actions';
import { AppButton, PageSpinner } from '../../components/common';
import AppToast from '../../components/AppToast';
import LoginInput from '../../components/LoginInput';
import { RESET_PASSWORD_URL } from '../../api/urls';
import { safeOpenURL } from '../../utils/network';
import RouteNames from '../../RouteNames';
import Theme from '../../Theme';

class ForgotPassword extends React.Component {
  static navigationOptions = () => ({
    title: 'Forgot Password',
  });

  onToastRef = ref => (this.toast = ref);
//   onForgotPress = () => safeOpenURL(RESET_PASSWORD_URL);
  onEmailTextChange = text => this.props.loginEmailChanged(text);
  onPasswordTextChange = text => this.props.loginPasswordChanged(text);
  onOTPTextChange = text => this.props.loginOTPChanged(text);
  state= {
    showOtpScreen :false
  }
  state= {
    showEmail :''
  }
//   showOtpScreen = false

onSubmitPress = () => {   
    const {loginEmail, navigation } = this.props;
    this.props.ResetPassword({
      email: loginEmail,
      showToast: this.showToast,
      onSuccess: () => {
        this.setState({
            ...this.state,
            showOtpScreen : true
        })
        this.setState({
            ...this.state,
            showEmail : loginEmail
        })
        // navigation.navigate(RouteNames.HomeStack);
      },
    });
  };

  onSignup2Press = () => {    
    const {  loginEmail, loginOTP, loginPassword, navigation } = this.props;
    this.props.signupUser2({
      password: loginPassword,
      email: this.state.showEmail,
      otp:loginOTP,
      showToast: this.showToast,
      onSuccess: () => {
        navigation.navigate(RouteNames.HomeStack);
      }
    });
  };

  showToast = message => this.toast.show(message, 2000);
  
   screen1 = () => {
    const {
        loginEmail,
        loginEmailError,
        signupIsLoading,
      } = this.props;
    return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContentContainer}>
             <LoginInput
              label="Email"
              style={styles.input}
              subtext={loginEmailError}
              error={loginEmailError.length > 0}
              value={loginEmail}
              onChangeText={this.onEmailTextChange}
            />
            <AppButton style={styles.loginButton} onPress={this.onSubmitPress}>
             Submit
            </AppButton>
            <AppToast refProp={this.onToastRef} />
        <PageSpinner visible={signupIsLoading} />
            </ScrollView>
            </View>

            )

}

screen2 = () => {
    const {
        loginOTP,
        loginOTPError,
        loginPassword,
        loginPasswordError,
        signupIsLoading,
      } = this.props;
    return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContentContainer}>
            <LoginInput
              label="OTP"
              style={styles.input}
              subtext={loginOTPError}
              error={loginOTPError.length > 0}
              value={loginOTP}
              onChangeText={this.onOTPTextChange}
            />
           
           <LoginInput
            secureTextEntry
            label="Password"
            textContentType="password"
            style={styles.input}
            subtext={loginPasswordError}
            error={loginPasswordError.length > 0}
            value={loginPassword}
            onChangeText={this.onPasswordTextChange}
          />
            <AppButton style={styles.loginButton} onPress={this.onSignup2Press}>
             Update
            </AppButton>
            <AppToast refProp={this.onToastRef} />
        <PageSpinner visible={signupIsLoading} />
            </ScrollView>
            </View>

            )

}

  render() {
    
   
    return (
        <View style={styles.container}>
          {!this.state.showOtpScreen ? this.screen1() : null}
          {this.state.showOtpScreen ? this.screen2() : null}
        </View>
      );
    {/* return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <LoginInput
            label="Username"
            style={styles.input}
            subtext={loginUsernameError}
            error={loginUsernameError.length > 0}
            value={loginUsername}
            onChangeText={this.onUsernameTextChange}
          />
           <LoginInput
            label="Email"
            style={styles.input}
            subtext={loginEmailError}
            error={loginEmailError.length > 0}
            value={loginEmail}
            onChangeText={this.onEmailTextChange}
          />
          <LoginInput
            secureTextEntry
            label="PhoneNumber"
            style={styles.input}
            subtext={loginPhoneNumberError}
            error={loginPhoneNumberError.length > 0}
            value={loginPhoneNumber}
            onChangeText={this.onPhoneNumberTextChange}
          />
          <AppButton style={styles.loginButton} onPress={this.onSignupPress}>
           Signup
          </AppButton>
          <AppButton
            solid
            toScale={false}
            style={styles.button}
            textStyle={styles.buttonText}
            color={Theme.colors.success}
            onPress={this.onLoginPress}>
            Log In
          </AppButton>
        </ScrollView>

        <AppToast refProp={this.onToastRef} />
        <PageSpinner visible={signupIsLoading} />
      </View>
    ); */}
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
  loginButton: {
    alignSelf: 'stretch',
    marginVertical: Theme.spacing.tiny,
  },
  forgotButton: {
    paddingVertical: Theme.spacing.tiny,
    paddingHorizontal: Theme.spacing.small,
  },
});

const mapStateToProps = ({ auth }) => auth;

export default connect(
  mapStateToProps,
  {
    loginEmailChanged,
    signupUser1,
    loginOTPChanged,
    loginPasswordChanged,
    signupUser2,
    ResetPassword

  },
)(ForgotPassword);
