import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, Text, TextInput, Button, Image, Dimensions } from 'react-native';
import {
  loginPasswordChanged,
  loginEmailChanged,
  loginUser,
} from '../../../redux/actions/AuthActions';
// import { AppButton, PageSpinner } from '../../../components/common';
import AppButton from '../../../components/common/AppButton';
import PageSpinner from '../../../components/common/PageSpinner';
import AppToast from '../../../components/AppToast';
import LoginInput from '../../../components/LoginInput';
import RouteNames from '../../../RouteNames';
import Theme from '../../../Theme';
import IconMaterialIcons from 'react-native-vector-icons/Feather';
import { Input } from 'react-native-elements';
import TextInputWithIcon from '../../../components/common/TextInputWithIcon';

const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";

class AuthLogin extends React.Component {
  static navigationOptions = () => ({
    title: 'Log In',
  });


  state = {
    isFocused: false
  }
  state = {
    hidePassword: true
  }
  state = {
    eyeicon: "eye-off"
  }
  handleFocus = event => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = event => {
    this.setState({ isFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };
  onToastRef = ref => (this.toast = ref);
  onForgotPress = () => this.props.navigation.navigate("ForgotPassword");
  onSignupPress = () => this.props.navigation.navigate("Signup");
  onEmailTextChange = text => this.props.loginEmailChanged(text);
  onPasswordTextChange = text => this.props.loginPasswordChanged(text);

  changeIcon = () => {
    const { eyeicon } = this.state;
    eyeicon !== "eye-off"
      ? (this.setState({ eyeicon: "eye" }), this.setState({ hidePassword: true }))
      : (this.setState({ eyeicon: "eye-off" }), this.setState({ hidePassword: false }))
  };

  onLoginPress = () => {
    const { loginEmail, loginPassword, navigation } = this.props;
    console.log("inside login")

    this.props.loginUser({
      email: loginEmail,
      password: loginPassword,
      showToast: this.showToast,
      onSuccess: () => {
        navigation.navigate('Profile');
      },
    });
  };

  showToast = message => this.toast.show(message, 2000);

  render() {
    const { isFocused, eyeicon, hidePassword } = this.state;
    const {
      loginEmail,
      loginEmailError,
      loginPassword,
      loginPasswordError,
      loginIsLoading,
      onFocus,
      onBlur,
    } = this.props;

    return (
      <View style={styles.MainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 5 }}>Welcome Back!</Text>
            <Image
              style={styles.backgroundImage}
              source={require('../../../assets/img/login.png')}
            />
          </View>
          <View style={styles.SectionStyle}>
            <Input inputContainerStyle={{ width: 330 }}
              // style={{ paddingLeft: 440 }}
              placeholder="Email"
              leftIcon={{ type: 'Feather', name: 'mail', size: 20 }}
              errorStyle={{ color: 'red' }}
              errorMessage={loginEmailError}
              value={loginEmail}
              onChangeText={this.onEmailTextChange}
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
          <AppButton style={styles.loginButton} color="#00008B" marginTop='100' onPress={this.onLoginPress}>
            Sign In
          </AppButton>

          <AppButton
            onlyText
            style={styles.forgotButton}
            marginTop='50'
            marginVertical
            color="#00008B"
            onPress={this.onForgotPress}>
            Forgot password?
          </AppButton>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
            <Text  >Don't have an account?</Text>
            <AppButton
              onlyText
              style={styles.register}
              color="#00008B"
              onPress={this.onSignupPress}>
              Register
          </AppButton>
          </View>

        </ScrollView>

        <AppToast refProp={this.onToastRef} />
        <PageSpinner visible={loginIsLoading} />
      </View>
    );
  }
}

const win = Dimensions.get('window');
const ratio = win.width / 3600;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50

    // backgroundColor: '#00FFFF',
  },
  settingsContainer: {
    margin: 20
  },

  emailIcon: {
    padding: 10,
  },
  inputext: {
    width: 200,
    height: 44,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  SectionStyle: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
    // width: 30

  },
  SectionStyle1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,

  },
  backgroundImage: {
    marginTop: 5,
    width: win.width,
    height: 2700 * ratio, //362 is actual height of image
    marginBottom: 10
  },

  ImageStyle: {
    // padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  TextInputStyleClass: {

  },
  MainContainer: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    borderRadius: 20,

  },
  scrollContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Theme.spacing.small,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  loginButton: {
    alignSelf: 'center',
    // paddingVertical: Theme.spacing.large,
    marginVertical: Theme.spacing.small,
    width: "50%",
    borderRadius: 20,
    // color:"rgb(20, 169, 201)" 
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
  headerTitle: {
    fontSize: 20,
    // letterSpacing: 1,
    fontFamily: "sans-serif",
  },
  headerComponent: {
    flexDirection: "row",
    height: 50,
    alignItems: 'center',
  },
});

const mapStateToProps = ({ auth }) => auth;

export default connect(
  mapStateToProps,
  {
    loginEmailChanged,
    loginPasswordChanged,
    loginUser,
  },
)(AuthLogin);