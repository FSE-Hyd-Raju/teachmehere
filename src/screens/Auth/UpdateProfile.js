import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, AsyncStorage,  Image, Text, Button  } from 'react-native';
import {
  loginUsernameChanged,
  loginDescriptionChanged,
  loginPhoneNumberChanged,
  updateProfile,
  updateProfilePic,
} from '../../actions';
import { AppButton, PageSpinner } from '../../components/common';
import AppToast from '../../components/AppToast';
import LoginInput from '../../components/LoginInput';
import { RESET_PASSWORD_URL } from '../../api/urls';
import { safeOpenURL } from '../../utils/network';
import RouteNames from '../../RouteNames';
import Theme from '../../Theme';
import ImgToBase64 from 'react-native-image-base64';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-picker';
import { Icon } from 'react-native-elements';


class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
    };
  }
  static navigationOptions = () => ({
    title: 'Update Profile',
  });
  
  // state = {
  //   filePath: {}
  // }

  state= {
    showImage : ''
} 

chooseFile = () => {
  var options = {
    title: 'Select Image',
    customButtons: [
      { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.showImagePicker(options, response => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      // let source = response;
      // You can also display the image using data:
      
      let source = { uri: 'data:image/jpeg;base64,' + response.data };
      console.log("sucharitha")
      console.log((JSON.stringify(response.data)))
   
      const { user } = this.props.auth;
      this.props.updateProfilePic({
        userId:user.accountId,
        displaypic:JSON.stringify(source),
  
        showToast: this.showToast,
        onSuccess: () => {
          
          this.props.navigation.navigate(RouteNames.Settings);
        },
      });
      this.setState({
        ...this.state,
        filePath: source,
      })
      
    }
  });
};

  onToastRef = ref => (this.toast = ref);
  onForgotPress = () => this.props.navigation.navigate(RouteNames.ForgotPassword);
  onUsernameTextChange = text => this.props.loginUsernameChanged(text);
  onPhoneNumberTextChange = text => this.props.loginPhoneNumberChanged(text);
  onDescriptionTextChange = text => this.props.loginDescriptionChanged(text);

  onUpdateProfilePress = () => {
    // var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
//  <Image style={{width: 100, height: 50, resizeMode: Image.resizeMode.contain, borderWidth: 1, borderColor: 'red'}} source={{uri: base64Icon}}/>


    //  ImgToBase64.getBase64String('https://bootdey.com/img/Content/avatar/avatar3.png').then(res => {
    //   // alert(JSON.stringify(res))  
      
    //   this.setState({
    //     ...this.state,
    //     showImage : JSON.stringify(res)
    //   }) 
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
     
      // });
  
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
            <View style={styles.containerImage}>
                <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar3.png'}}/>
                <Icon name={'edit'} containerStyle={styles.editicon} onPress={this.chooseFile.bind(this)}/>
                {/* <Text style={styles.title}>{user.username}</Text> */}
                <Image
            source={{
              uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
            }}
            style={{ width: 100, height: 100 }} 
          />
          <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 100, height: 20 }}
          />
          {/* <Text style={{ alignItems: 'center' }}>
            {this.state.filePath.uri}
          </Text> */}
          {/* <Button title="Choose File" onPress={this.chooseFile.bind(this)} /> */}
            </View>
           
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
  header:{
    backgroundColor: Theme.colors.background
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  containerImage: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#FF6347",
    marginBottom:10,
  },
  editicon: {
    backgroundColor: '#ccc',
    position: 'absolute',
    right: 0,
    bottom: 0,
   },
  icon:{
    width: 40,
    height: 40,
  },
  title:{
    fontSize:18,
    color:"#EE82EE",
    marginLeft:4
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
  }
});


const mapStateToProps = ({ auth }) => ({ auth: auth });
// const mapStateToProps = ({ auth }) => auth;

export default connect(
  mapStateToProps,
  
  {
    loginUsernameChanged,
    loginDescriptionChanged,
    loginPhoneNumberChanged,

    updateProfile,
    updateProfilePic
  },
)(UpdateProfile);
