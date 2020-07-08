import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, AsyncStorage,  Image, Text, Button,  } from 'react-native';
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
import RouteNames from '../../RouteNames';
import Theme from '../../Theme';
import ImagePicker from 'react-native-image-picker';
import { Icon } from 'react-native-elements';
import { TextInput } from 'react-native-paper';

class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
      isImageAvailable: false,
      profilePic: null
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

state={
  username:'',
  description:'',
  phonenumber:'',
  isUsernameAvailable:false,
  isDescriptionAvailable:false,
  isPhonenumberAvailable:false,

}

componentDidMount = () => {
  this.getImage();
}

getImage = async () => {
  const profilePic = await AsyncStorage.getItem("profilePic");
  if (profilePic) {
      this.setState({
          isImageAvailable: true,
          profilePic: JSON.parse(profilePic)
      });
  }
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
      const { user } = this.props.auth;
      this.props.updateProfilePic({
        userId:user.accountId,
        displaypic:JSON.stringify(source),
  
        showToast: this.showToast,
        onSuccess: () => {
          
          this.props.navigation.navigate(RouteNames.Settings);
        },
      });
      AsyncStorage.setItem("profilePic", JSON.stringify(source));
      this.setState({
        ...this.state,
        filePath: source,
        profilePic: source,
        isImageAvailable: true
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
    const { user, loginUsername, loginPhoneNumber, loginDescription } = this.props.auth;
      this.props.updateProfile({
         
      
        username: loginUsername,
        phonenumber:loginPhoneNumber,
        description: loginDescription,
        userId:user.accountId,
        email:user.email,
  
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
            <View >
                {
                    this.state.isImageAvailable && (
                        <Image source={this.state.profilePic} style={{ width: 200, height: 200 }} />
                      

                    )
                }
            <Icon name={'edit'} containerStyle={styles.editicon} onPress={this.chooseFile.bind(this)}/>
            </View>
           
          <TextInput
           
            label="Username"
            // style={styles.input}
            mode="outlined"
             style={{ width: '100%', padding: 10 }}
            subtext={loginUsernameError}
            error={loginUsernameError.length > 0}
            value={loginUsername}
            onChangeText={this.onUsernameTextChange}
          />
            <TextInput
              label="PhoneNumber"
              mode="outlined"
              keyboardType="numeric"
              style={{ width: '100%', padding: 10 }}
              subtext={loginPhoneNumberError}
              error={loginPhoneNumberError.length > 0}
              value={loginPhoneNumber}
              onChangeText={this.onPhoneNumberTextChange}
            />
             <TextInput
              label="Description"
              mode="outlined"
              multiline = {true}
              numberOfLines = {4}
              style={{ width: '100%', padding: 10 }}
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
    backgroundColor:  '#fff',
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
    // borderColor: "#FF6347",
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
