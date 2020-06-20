import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import {
  loginUsernameChanged,
  loginDescriptionChanged,
  loginPhoneNumberChanged,
  updateProfile,
} from '../../actions';
import { AppButton, PageSpinner } from '../../components/common';
import AppToast from '../../components/AppToast';
import LoginInput from '../../components/LoginInput';
import { RESET_PASSWORD_URL } from '../../api/urls';
import { safeOpenURL } from '../../utils/network';
import RouteNames from '../../RouteNames';
import Theme from '../../Theme';

class UpdateProfile extends React.Component {
  static navigationOptions = () => ({
    title: 'Update Profile',
  });
 
  
  onToastRef = ref => (this.toast = ref);
  onForgotPress = () => this.props.navigation.navigate(RouteNames.ForgotPassword);
  onUsernameTextChange = text => this.props.loginUsernameChanged(text);
  onPhoneNumberTextChange = text => this.props.loginPhoneNumberChanged(text);
  onDescriptionTextChange = text => this.props.loginDescriptionChanged(text);

  onUpdateProfilePress = () => {
   

    const { user, loginUsername, loginPhoneNumber, loginDescription } = this.props.auth;
  
    this.props.updateProfile({
      username: loginUsername,
      phonenumber:loginPhoneNumber,
      description: loginDescription,
      userId:user.accountId,
      email:user.username,

      showToast: this.showToast,
      onSuccess: () => {
        
        this.props.navigation.navigate(RouteNames.Settings);
      },
    });
  };

  showToast = message => this.toast.show(message, 2000);

  render() {
    const {
      loginUsername,
      loginUsernameError,
      loginPassword,
      loginPasswordError,
      loginEmail,
      loginEmailError,
      loginPhoneNumber,
      loginDescription,
      loginPhoneNumberError,
      loginIsLoading,
      user
    } = this.props.auth;
   

    return (
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
              label="PhoneNumber"
              style={styles.input}
              subtext={loginPhoneNumberError}
              error={loginPhoneNumberError.length > 0}
              value={loginPhoneNumber}
              onChangeText={this.onPhoneNumberTextChange}
            />
             <LoginInput
              label="Description"
              style={styles.input}
              value={loginDescription}
              onChangeText={this.onDescriptionTextChange}
            />

          <AppButton style={styles.loginButton} onPress={this.onUpdateProfilePress}>
            Update
          </AppButton>
        </ScrollView>

        <AppToast refProp={this.onToastRef} />
        <PageSpinner visible={loginIsLoading} />
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
  loginButton: {
    alignSelf: 'stretch',
    marginVertical: Theme.spacing.tiny,
  },
  forgotButton: {
    paddingVertical: Theme.spacing.tiny,
    paddingHorizontal: Theme.spacing.small,
  },
});


const mapStateToProps = ({ auth }) => ({ auth: auth });
// const mapStateToProps = ({ auth }) => auth;

export default connect(
  mapStateToProps,
  
  {
    loginUsernameChanged,
    loginDescriptionChanged,
    loginPhoneNumberChanged,

    updateProfile
  },
)(UpdateProfile);
