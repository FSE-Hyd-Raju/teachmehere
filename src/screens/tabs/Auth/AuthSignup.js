import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import {
  signupUsernameChanged,
  loginEmailChanged,
  loginPhoneNumberChanged,
  loginOTPChanged,
  loginPasswordChanged,
  signupUser1,
  signupUser2,
} from '../../../redux/actions';
import AppButton from '../../../components/common/AppButton';
import PageSpinner from '../../../components/common/PageSpinner';
import AppToast from '../../../components/AppToast';
import LoginInput from '../../../components/LoginInput';
import RouteNames from '../../../RouteNames';
import Theme from '../../../Theme';
import { Input } from 'react-native-elements';
import IconMaterialIcons from 'react-native-vector-icons/Feather';



class AuthSignup extends React.Component {
  static navigationOptions = () => ({
    title: 'Signup',
  });

  onToastRef = ref => (this.toast = ref);
  onForgotPress = () => safeOpenURL(RESET_PASSWORD_URL);
  onUsernameTextChange = text => this.props.signupUsernameChanged(text);
  onEmailTextChange = text => this.props.loginEmailChanged(text);
  onPhoneNumberTextChange = text => this.props.loginPhoneNumberChanged(text);
  onPasswordTextChange = text => this.props.loginPasswordChanged(text);
  onOTPTextChange = text => this.props.loginOTPChanged(text);
  state = {
    showOtpScreen: false
  }
  state = {
    showEmail: ''
  }
  state = {
    hidePassword: true
  }
  state = {
    eyeicon: "eye-off"
  }
  changeIcon = () => {
    const { eyeicon } = this.state;
    eyeicon !== "eye-off"
      ? (this.setState({ eyeicon: "eye" }), this.setState({ hidePassword: true }))
      : (this.setState({ eyeicon: "eye-off" }), this.setState({ hidePassword: false }))
  };
  onSignupPress = () => {
    const { loginUsername, loginEmail, loginPhoneNumber, navigation } = this.props;

    this.props.signupUser1({
      username: loginUsername,
      email: loginEmail,
      phonenumber: loginPhoneNumber,
      showToast: this.showToast,
      onSuccess: () => {
        this.setState({
          ...this.state,
          showOtpScreen: true
        })
        this.setState({
          ...this.state,
          showEmail: loginEmail
        })
      },
    });
  };

  onSignup2Press = () => {
    const { loginEmail, loginOTP, loginPassword, navigation } = this.props;
    this.props.signupUser2({
      password: loginPassword,
      email: this.state.showEmail,
      otp: loginOTP,
      showToast: this.showToast,
      onSuccess: () => {
        navigation.navigate("Profile");
      }
    });
  };

  showToast = message => this.toast.show(message, 2000);

  screen1 = () => {
    const {
      loginUsername,
      loginUsernameError,
      loginEmail,
      loginEmailError,
      loginPhoneNumber,
      loginPhoneNumberError,
      signupIsLoading,
    } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          {/* <LoginInput
            label="Username"
            style={styles.input}
            subtext={loginUsernameError}
            error={loginUsernameError.length > 0}
            value={loginUsername}
            onChangeText={this.onUsernameTextChange}
          /> */}
          <View style={styles.SectionStyle}>
            <Input
              style={{ paddingLeft: 20 }}
              placeholder="Username"
              leftIcon={
                <IconMaterialIcons
                  name='user'
                  size={20}
                />}
              errorStyle={{ color: 'red' }}
              errorMessage={loginUsernameError}
              value={loginUsername}
              onChangeText={this.onUsernameTextChange}
            />

          </View>
          <View style={styles.SectionStyle}>
            <Input
              style={{ paddingLeft: 20 }}
              placeholder="Email"
              leftIcon={{ type: 'Feather', name: 'mail', size: 20 }}
              errorStyle={{ color: 'red' }}
              errorMessage={loginEmailError}
              value={loginEmail}
              onChangeText={this.onEmailTextChange}
            />

          </View>
          {/* <LoginInput
            label="PhoneNumber"
            style={styles.input}
            subtext={loginPhoneNumberError}
            error={loginPhoneNumberError.length > 0}
            value={loginPhoneNumber}
            onChangeText={this.onPhoneNumberTextChange}
          /> */}

          <View style={styles.SectionStyle}>
            <Input
              style={{ paddingLeft: 20 }}
              placeholder="PhoneNumber"
              leftIcon={
                <IconMaterialIcons
                  name='phone'
                  size={20}
                />}
              errorStyle={{ color: 'red' }}
              errorMessage={loginPhoneNumberError}
              value={loginPhoneNumber}
              onChangeText={this.onPhoneNumberTextChange}
            />

          </View>
          <AppButton style={styles.loginButton} color="#00008B" marginTop='100' onPress={this.onSignupPress}>
            Signup
            </AppButton>
          <AppToast refProp={this.onToastRef} />
          <PageSpinner visible={signupIsLoading} />
        </ScrollView>
      </View>

    )

  }

  screen2 = () => {
    const { isFocused, eyeicon, hidePassword } = this.state;
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
          {/* <LoginInput
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
          /> */}

          <View style={styles.SectionStyle}>
            <Input
              style={{ paddingLeft: 20 }}
              placeholder="OTP"
              leftIcon={
                <IconMaterialIcons
                  name='key'
                  size={20}
                />}
              errorStyle={{ color: 'red' }}
              errorMessage={loginOTPError}
              value={loginOTP}
              onChangeText={this.onOTPTextChange}
            />

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
              rightIcon={<IconMaterialIcons name={eyeicon} size={20} margin="10" onPress={this.changeIcon} />}
              errorStyle={{ color: 'red' }}
              errorMessage={loginPasswordError}
              value={loginPassword}
              onChangeText={this.onPasswordTextChange}
            />
          </View>
          <AppButton style={styles.loginButton} color="#00008B" marginTop='100' onPress={this.onSignup2Press}>
            Sumbit
            </AppButton>
          <AppToast refProp={this.onToastRef} />
          <PageSpinner visible={signupIsLoading} />
        </ScrollView>
      </View>

    )

  }

  render() {


    return (
      <View style={styles.MainContainer}>
        <View style={{
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 30, marginTop: 100 }}>Sign up</Text>
          <Text style={{ color: 'gray', fontSize: 15 }} >Fill the details & create your account</Text>
        </View>
        {!this.state.showOtpScreen ? this.screen1() : null}
        {this.state.showOtpScreen ? this.screen2() : null}
      </View>
    );
  }
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

const mapStateToProps = ({ auth }) => auth;

export default connect(
  mapStateToProps,
  {
    signupUsernameChanged,
    loginEmailChanged,
    loginPhoneNumberChanged,
    signupUser1,
    loginOTPChanged,
    loginPasswordChanged,
    signupUser2,

  },
)(AuthSignup);