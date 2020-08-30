// import React, { Component, Fragment, useEffect } from 'react';
// import { View, StyleSheet, ScrollView, Text, Image, Dimensions, TextInput } from 'react-native';
// import { Input, Button, Icon, Avatar } from 'react-native-elements';
// import Theme from '../../../Theme';
// import IconMaterialIcons from 'react-native-vector-icons/Feather';
// import { useDispatch, useSelector } from 'react-redux'
// import { clearErrors, signupFailure, onSignupOtpPressed, onSignupPressed, signupSelector } from '../../../redux/slices/signupSlice'
// import PageSpinner from '../../../components/common/PageSpinner';
// //import ImgToBase64 from 'react-native-image-base64';
// import * as yup from 'yup'
// import { Formik } from 'formik'
// import ImagePicker from 'react-native-image-picker';
// import { changeProfileSelector, clearProfileErrors, changeProfileDescriptionChanged, onChangeImagePressed, onChangeProfilePressed } from '../../../redux/slices/changeProfileSlice';
// import { loadUserInfo, loginSelector } from '../../../redux/slices/loginSlice'
// import OTPTextView from 'react-native-otp-textinput';

// export default function signupPage({ navigation }) {

//     const dispatch = useDispatch()
//     const { userInfo } = useSelector(loginSelector)
//     const { loading, signupPasswordError, signupEmailError, signupPhonenumberError, signupUsernameError, signupOtpError } = useSelector(signupSelector)
//     const { changeProfileDescription, DescriptionError } = useSelector(changeProfileSelector);
//     const [hidePassword, sethidePassword] = React.useState(true);
//     const [showOtpScreen, setshowOtpScreen] = React.useState(false);
//     const [showEmail, setshowEmail] = React.useState("");
//     const [sourceImage, setSource] = React.useState({});
//     const [showDescriptionScreen, setshowDescriptionScreen] = React.useState(false);
//     const [eyeicon, seteyeicon] = React.useState("eye");
//     const onSigninPress = () => navigation.navigate('Login');
//     const [passwordEntered, setPasswordEntered] = React.useState("");
//     const [emailEntered, setEmailEntered] = React.useState("");
//     const [resendtimer, setResendtimer] = React.useState(5);

//     const toggleEyeIcon = () => {
//         if (eyeicon === "eye") {
//             seteyeicon("eye-off")
//             sethidePassword(false)
//         }
//         else {
//             seteyeicon("eye")
//             sethidePassword(true)
//         }
//     };

//     useEffect(() => {
//         let interval = null;
//         if (showOtpScreen && resendtimer !== 0) {
//             interval = setInterval(() => {
//                 setResendtimer(resendtimer => resendtimer - 1);
//             }, 1000);
//         } else if (!resendtimer) {
//             clearInterval(interval);
//         }
//         return () => clearInterval(interval);
//     }, [showOtpScreen, resendtimer]);

//     // useEffect(() => {
//     //     ImgToBase64.getBase64String('file://' + '/src/assets/img/default-mask-avatar.png')
//     //         .then(base64String => {
//     //             console.log("hi there")
//     //             console.log(base64String)
//     //             setSource({ uri: 'data:image/jpeg;base64,' + base64String })
//     //         })
//     //         .catch(err => console.log(err));
//     // }, []);


//     const hideOtpScreen = () => {
//         setshowOtpScreen(false)
//         navigation.navigate("Signup")
//     }

//     const backButtonComponent = () => {
//         return (
//             <View style={{ alignItems: "flex-start" }}>
//                 <Icon
//                     // raised
//                     size={27}
//                     style={{ paddingLeft: 2 }}
//                     name='arrow-left'
//                     type='feather'
//                     color='#1E90FF'
//                     onPress={hideOtpScreen} />
//             </View>
//         )
//     }

//     const headerComponent = () => {
//         return (
//             <View>
//                 {showOtpScreen ? backButtonComponent() : null}
//                 <View style={{
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginTop: 30,
//                     marginBottom: 50
//                 }}>
//                     <Text style={{ fontWeight: 'bold', fontSize: 30, marginBottom: 15 }}>Sign up</Text>
//                     <Text style={{ color: 'gray', fontSize: 15, textAlign: "center" }} >OTP will be sent to your email</Text>
//                 </View>
//             </View>
//         )
//     }

//     const screen1 = () => {
//         return (
//             <View>
//                 {headerComponent()}
//                 <Formik
//                     initialValues={{ email: '', username: '', phonenumber: '', password: '' }}
//                     onSubmit={values => {
//                         setPasswordEntered(values.password)
//                         setEmailEntered(values.email)
//                         dispatch(onSignupPressed(
//                             {
//                                 email: values.email,
//                                 username: values.username,
//                                 phonenumber: values.phonenumber,
//                                 onSuccess: () => {
//                                     setshowOtpScreen(true)
//                                     setshowEmail(values.email)
//                                 }
//                             }

//                         ))
//                     }
//                     }

//                     // new line
//                     validationSchema={
//                         yup.object().shape({
//                             email: yup
//                                 .string()
//                                 .email()
//                                 .required(),
//                             phonenumber: yup
//                                 .number()
//                                 .required(),
//                             username: yup
//                                 .string()
//                                 .min(5)
//                                 .required(),
//                             password: yup
//                                 .string()
//                                 .min(5)
//                                 .required(),
//                         })
//                     } >
//                     {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
//                         <Fragment>
//                             <View style={styles.inputComponentStyle}>
//                                 <Input
//                                     style={{ paddingLeft: 20 }}
//                                     placeholder="Username"
//                                     leftIcon={
//                                         <IconMaterialIcons
//                                             name='user'
//                                             size={20}
//                                         />}
//                                     containerStyle={{ width: 310 }}
//                                     leftIconContainerStyle={{ paddingRight: 15 }}
//                                     inputStyle={{ fontSize: 16 }}
//                                     errorMessage={signupUsernameError}
//                                     value={values.username}
//                                     onChangeText={(e) => {
//                                         handleChange("username")(e);
//                                         dispatch(clearErrors())
//                                     }}
//                                     onBlur={() => setFieldTouched('username')}
//                                 />
//                                 {touched.username && errors.username &&
//                                     <Text style={{ fontSize: 10, color: 'red' }}>{errors.username}</Text>
//                                 }

//                                 <Input
//                                     style={{ paddingLeft: 20 }}
//                                     placeholder="Email"
//                                     leftIcon={{ type: 'Feather', name: 'mail', size: 20 }}
//                                     errorMessage={signupEmailError}
//                                     value={values.email}
//                                     onChangeText={(e) => {
//                                         handleChange("email")(e);
//                                         dispatch(clearErrors())
//                                     }}
//                                     containerStyle={{ width: 310 }}
//                                     leftIconContainerStyle={{ paddingRight: 15 }}
//                                     inputStyle={{ fontSize: 16 }}
//                                     onBlur={() => setFieldTouched('email')}
//                                 />
//                                 {touched.email && errors.email &&
//                                     <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
//                                 }

//                                 <Input
//                                     style={{ paddingLeft: 20 }}
//                                     placeholder="Phonenumber"
//                                     leftIcon={
//                                         <IconMaterialIcons
//                                             name='phone'
//                                             size={20}
//                                         />}
//                                     value={values.phonenumber}
//                                     errorMessage={signupPhonenumberError}
//                                     onChangeText={(e) => {
//                                         handleChange("phonenumber")(e);
//                                         dispatch(clearErrors())
//                                     }}
//                                     containerStyle={{ width: 310 }}
//                                     leftIconContainerStyle={{ paddingRight: 15 }}
//                                     inputStyle={{ fontSize: 16 }}
//                                     onBlur={() => setFieldTouched('phonenumber')}
//                                 />
//                                 {touched.phonenumber && errors.phonenumber &&
//                                     <Text style={{ fontSize: 10, color: 'red' }}>{errors.phonenumber}</Text>
//                                 }
//                                 <Input
//                                     placeholder="Password"
//                                     secureTextEntry={hidePassword}
//                                     leftIcon={
//                                         <IconMaterialIcons
//                                             name='lock'
//                                             size={20}
//                                         />}
//                                     rightIcon={<IconMaterialIcons name={eyeicon} size={20} margin="10" onPress={toggleEyeIcon} />}
//                                     onChangeText={(e) => {
//                                         handleChange("password")(e);
//                                         dispatch(clearErrors())
//                                     }}
//                                     containerStyle={{ width: 310 }}
//                                     inputStyle={{ fontSize: 16 }}
//                                     leftIconContainerStyle={{ paddingRight: 15 }}
//                                     onBlur={() => setFieldTouched('password')}
//                                     errorMessage={signupPasswordError}
//                                 />
//                                 {touched.password && errors.password &&
//                                     <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
//                                 }

//                                 <Button title="Sign up" disabled={!isValid} type="solid" containerStyle={styles.loginButton} onPress={handleSubmit} />
//                             </View>
//                         </Fragment>
//                     )
//                     }
//                 </Formik >
//                 <View
//                     style={{
//                         flexDirection: 'row',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         marginTop: 10,
//                     }}>
//                     <Text>Already have an account?</Text>
//                     <Button title="Sign in" type="clear" containerStyle={styles.signin} onPress={(onSigninPress)} />
//                 </View>
//             </View>
//         )

//     }

//     const screen2 = () => {
//         var input1 = "";

//         // useEffect(() => {
//         //     // cancelInterval && clearInterval(cancelInterval)
//         //     // var cancelInterval = setInterval(function () {
//         //     //     // alert(resendtimer)
//         //     //     setResendtimer(resendtimer - 1)
//         //     //     if (!resendtimer) clearInterval(cancelInterval)
//         //     // }, 1000)
//         //     const timer=setTimeout(() => {
//         //         setResendtimer(calculateTimeLeft());
//         //       }, 1000);
//         //       // Clear timeout if the component is unmounted
//         //       return () => clearTimeout(timer);
//         // })
//         return (
//             <View>
//                 <View style={{
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginTop: 20,
//                     marginBottom: 35

//                 }}>
//                     <Text style={{ fontSize: 20, color: "grey" }}>Veirfy Account</Text>
//                 </View>
//                 <View style={{
//                     justifyContent: "center",
//                     alignItems: "center"
//                 }}>
//                     <Image
//                         style={styles.backgroundImage}
//                         resizeMode={'stretch'}
//                         source={require('../../../assets/img/otpscreen.png')}
//                     />
//                 </View>
//                 <View style={{
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginTop: 20,
//                     marginBottom: 35
//                 }}>
//                     <Text style={{ color: 'gray', fontSize: 15, textAlign: "center" }} >Please enter the OTP sent to your email {emailEntered}</Text>
//                 </View>

//                 <Formik
//                     initialValues={{ otp: '' }}
//                     onSubmit={values => dispatch(onSignupOtpPressed(
//                         {
//                             otp: values.otp,
//                             password: passwordEntered,
//                             email: showEmail,
//                             onSuccess: (data) => {
//                                 dispatch(loadUserInfo(data))
//                                 setshowDescriptionScreen(true)
//                                 // navigation.navigate('Profile');
//                             }
//                         }

//                     ))}

//                     // new line
//                     validationSchema={
//                         yup.object().shape({
//                             otp: yup
//                                 .number()
//                                 .required()
//                         })
//                     } >
//                     {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
//                         <Fragment>
//                             <View style={styles.inputComponentStyle}>
//                                 <View style={{ margin: 10, marginBottom: 30 }}>
//                                     {/* <Text style={{ marginLeft: -25 }}>OTP</Text> */}
//                                     <OTPTextView
//                                         ref={(e) => (input1 = e)}
//                                         tintColor="black"
//                                         handleTextChange={(e) => {
//                                             handleChange("otp")(e);
//                                             dispatch(clearErrors())
//                                         }}
//                                         textInputStyle={{ borderBottomWidth: 2 }}
//                                         inputCount={4}
//                                         keyboardType="numeric"
//                                     />
//                                 </View>
//                                 {/* <Input
//                                     style={{ paddingLeft: 20 }}
//                                     placeholder="OTP"
//                                     leftIcon={
//                                         <IconMaterialIcons
//                                             name='key'
//                                             size={20}
//                                         />}
//                                     errorMessage={signupOtpError}
//                                     containerStyle={{ width: 310 }}
//                                     leftIconContainerStyle={{ paddingRight: 15 }}
//                                     inputStyle={{ fontSize: 16 }}
//                                     value={values.otp}
//                                     onBlur={() => setFieldTouched('otp')}
//                                     onChangeText={(e) => {
//                                         handleChange("otp")(e);
//                                         dispatch(clearErrors())
//                                     }}
//                                 /> */}
//                                 {!!signupOtpError &&
//                                     <Text style={{ fontSize: 13, color: 'red' }}>{signupOtpError}</Text>
//                                 }
//                                 <Button title="Verify" disabled={!isValid} type="solid" containerStyle={styles.loginButton} onPress={handleSubmit} />
//                                 <View
//                                     style={{
//                                         flexDirection: 'row',
//                                         justifyContent: 'center',
//                                         alignItems: 'center',
//                                         marginBottom: 10,
//                                     }}>
//                                     <Text>If you didn't receive a code!</Text>
//                                     {!resendtimer && <Button title="Resend" type="clear" containerStyle={styles.register} onPress={() => console.log("resend")} />}
//                                     {!!resendtimer && <Button title={resendtimer + " secs"} type="clear" containerStyle={styles.register} disabled />}
//                                 </View>
//                             </View>
//                         </Fragment>
//                     )
//                     }
//                 </Formik >
//             </View>
//         )

//     }

//     const chooseFile = async () => {
//         var options = {
//             title: 'Select Image',
//             customButtons: [
//                 { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
//             ],
//             storageOptions: {
//                 skipBackup: true,
//                 path: 'images',
//             },
//         };
//         ImagePicker.showImagePicker(options, response => {
//             console.log('Response = ', response);
//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//                 alert(response.customButton);
//             } else {
//                 let imgSource = { uri: 'data:image/jpeg;base64,' + response.data };
//                 setSource(imgSource)
//             }
//         });
//     };

//     const descriptionComponent = () => {
//         return (
//             <Formik
//                 initialValues={{ description: '' }}

//                 onSubmit={values =>
//                     dispatch(
//                         onChangeProfilePressed({
//                             id: userInfo._id,
//                             displaypic: sourceImage.uri,
//                             description: values.description,
//                             username: userInfo.username,
//                             onSuccess: (data) => {
//                                 dispatch(loadUserInfo(data))
//                                 navigation.reset({
//                                     index: 0,
//                                     routes: [{ name: 'Profile' }],
//                                 });


//                             },
//                         }),
//                     )
//                 }
//                 // new line
//                 validationSchema={yup.object().shape({
//                     description: yup
//                         .string()

//                 })}>
//                 {({
//                     values,
//                     handleChange,
//                     errors,
//                     setFieldTouched,
//                     touched,
//                     isValid,
//                     handleSubmit,
//                 }) => (
//                         <Fragment>
//                             <View >
//                                 <TextInput
//                                     style={{
//                                         borderBottomColor: '#000000',
//                                         borderBottomWidth: 1,

//                                     }}

//                                     placeholder="Description"
//                                     multiline
//                                     numberOfLines={4}
//                                     errorMessage={DescriptionError}
//                                     value={values.description}
//                                     onChangeText={(e) => {
//                                         handleChange("description")(e);
//                                         dispatch(clearProfileErrors())
//                                     }}
//                                 // onBlur={() => setFieldTouched('description')}
//                                 />
//                                 {touched.description && errors.description &&
//                                     <Text style={{ fontSize: 10, color: 'red' }}>{errors.description}</Text>
//                                 }
//                             </View>
//                             <Button
//                                 title="Submit"
//                                 disabled={!isValid}
//                                 type="solid"
//                                 containerStyle={styles.loginButton}
//                                 onPress={handleSubmit}
//                             />
//                         </Fragment>
//                     )}
//             </Formik>
//         );
//     };

//     const onSkipPressed = () => {
//         dispatch(
//             onChangeProfilePressed({
//                 id: userInfo._id,
//                 displaypic: sourceImage.uri,
//                 description: '',
//                 username: userInfo.username,
//                 onSuccess: (data) => {
//                     dispatch(loadUserInfo(data))

//                     navigation.navigate('Profile');
//                 },
//             }),
//         )
//     }

//     const skipButtonComponent = () => {
//         return (
//             <View style={{ alignItems: 'flex-end' }}>
//                 <Button title="skip" type='clear' onPress={() => navigation.reset({
//                     index: 0,
//                     routes: [{ name: 'Profile' }],
//                 })} />

//             </View>
//         )
//     }

//     const userImageContainer = () => {
//         return (
//             <View style={styles.userImageContainer}>
//                 <Avatar
//                     rounded
//                     showEditButton
//                     size={200}
//                     title='Grace'
//                     containerStyle={{ margin: 10 }}
//                     editButton={{
//                         name: 'arrow-left', type: 'feather'
//                     }}
//                     style={{ width: 200, height: 200 }}
//                     // source={{ uri: sourceImage.uri }}
//                     source={sourceImage.uri ? { uri: sourceImage.uri } : require('../../../assets/img/default-mask-avatar.png')}

//                 />
//                 <View style={{
//                     backgroundColor: 'white', position: 'relative',
//                     bottom: 75, left: 70, alignItems: 'flex-end',
//                     justifyContent: 'flex-end', borderRadius: 30, padding: 10
//                 }}>
//                     <Icon
//                         // raised
//                         size={40}
//                         style={{ margin: 70 }}
//                         name='edit'
//                         type='material'
//                         color='black'
//                         onPress={() => chooseFile()} />
//                     {/* <ActivityIndicator
//                         style={styles.activityIndicator}
//                         animating={loading}
//                     /> */}
//                 </View>
//             </View >
//         )
//     }

//     const screen3 = () => {
//         return (
//             <View style={styles.ProfileContainer}>
//                 <ScrollView showsVerticalScrollIndicator={false}>
//                     <View style={{
//                         justifyContent: "center",
//                         alignItems: "center"
//                     }}>
//                         <Text style={{ fontWeight: 'bold', fontSize: 30, marginTop: 80 }}>Add your details</Text>
//                         {/* <Text style={{ color: 'gray', fontSize: 15 }} >Add the image and description</Text> */}
//                     </View>

//                     {userImageContainer()}
//                     <View>
//                         {descriptionComponent()}
//                     </View>
//                     {skipButtonComponent()}

//                 </ScrollView>
//             </View>
//         );

//     }

//     return (
//         <View style={styles.MainContainer}>
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 {!showDescriptionScreen && <View>
//                     {!showOtpScreen ? screen1() : null}
//                     {showOtpScreen ? screen2() : null}
//                 </View>}
//                 {!!showDescriptionScreen && screen3()}
//                 <PageSpinner visible={loading} />
//             </ScrollView >
//         </View>
//     );
// }


// const win = Dimensions.get('window');
// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         flex: 1,
//         marginTop: 25,
//         backgroundColor: "rgb(255, 255, 255)",
//     },
//     signin: {
//         paddingVertical: Theme.spacing.tiny,
//         // paddingRight: Theme.spacing.small,
//         marginLeft: 7,
//     },
//     inputComponentStyle: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         // marginTop: 30
//     },
//     MainContainer: {
//         // Setting up View inside content in Vertically center.
//         flex: 1,
//         padding: 30,
//         backgroundColor: "rgb(255, 255, 255)",
//     },
//     loginButton: {
//         alignSelf: 'center',
//         marginVertical: Theme.spacing.small,
//         width: "50%",
//         borderRadius: 20,
//     },
//     userImageContainer: {
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     ProfileContainer: {
//         flex: 1,
//         backgroundColor: 'rgb(255, 255, 255)',
//         padding: 30,
//         paddingTop: 10
//     },
//     backgroundImage: {
//         // marginTop: 5,
//         width: 200,
//         height: 200,
//         // marginBottom: 30,
//     },
// });
