import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, TextInput, Text, Image, Dimensions } from 'react-native';
import {
  loginEmailChanged,
  loginOTPChanged,
  loginPasswordChanged,
  signupUser1,
  signupUser2,
  ResetPassword
} from '../../../redux/actions';
import AppButton from '../../../components/common/AppButton';
import PageSpinner from '../../../components/common/PageSpinner';
import AppToast from '../../../components/AppToast';
import LoginInput from '../../../components/LoginInput';
import { Input } from 'react-native-elements';
import IconMaterialIcons from 'react-native-vector-icons/Feather';

import RouteNames from '../../../RouteNames';
import Theme from '../../../Theme';

class ForgotPassword extends React.Component {
  static navigationOptions = () => ({
    title: 'Forgot Password',
  });

  onToastRef = ref => (this.toast = ref);
  //   onForgotPress = () => safeOpenURL(RESET_PASSWORD_URL);
  onEmailTextChange = text => this.props.loginEmailChanged(text);
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
  //   showOtpScreen = false

  onSubmitPress = () => {
    const { loginEmail, navigation } = this.props;
    this.props.ResetPassword({
      email: loginEmail,
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
        // navigation.navigate(RouteNames.HomeStack);
      },
    });
  };
  changeIcon = () => {
    const { eyeicon } = this.state;
    eyeicon !== "eye-off"
      ? (this.setState({ eyeicon: "eye" }), this.setState({ hidePassword: true }))
      : (this.setState({ eyeicon: "eye-off" }), this.setState({ hidePassword: false }))
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
      loginEmail,
      loginEmailError,
      signupIsLoading,
    } = this.props;
    return (
      <View style={styles.MainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
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

          <AppButton style={styles.loginButton} color="#00008B" marginTop='100' onPress={this.onSubmitPress}>
            Submit
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
      <View style={styles.MainContainer}>
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
      <View style={styles.MainContainer}>
        <View style={{
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 5 }}>Forgot Password</Text>
          {/* <Text style={{ fontStyle: '#dddddd', fontSize: 15 }} >Enter the email address associated with this account</Text> */}
          <Image
            style={styles.backgroundImage}
            source={require('../../../assets/img/forgotpassword.png')}
          />
        </View>
        {this.state.showOtpScreen ? this.screen1() : null}
        {!this.state.showOtpScreen ? this.screen2() : null}
      </View>
    );
  }
}

const win = Dimensions.get('window');
const ratio = win.width / 3600;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
  },
  scrollContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Theme.spacing.small,
  },
  backgroundImage: {
    marginTop: 5,
    width: win.width,
    height: 2700 * ratio, //362 is actual height of image
    marginBottom: 10
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  input: {
    marginTop: Theme.spacing.tiny,
  },
  TextInputStyleClass: {

    // Setting up Hint Align center.

    textAlign: 'center',
    backgroundColor: "#E0E0E0",
    height: 40,
    borderWidth: 2,
    borderColor: 'white',
    width: '100%',
    marginBottom: 10,
    borderRadius: 20,

    // height: 40, borderColor: 'gray', borderWidth: 2, color : "blue"

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
  MainContainer: {

    // Setting up View inside content in Vertically center.
    justifyContent: 'center',
    flex: 1,
    marginTop: 20,
    backgroundColor: "rgb(255, 255, 255)",

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