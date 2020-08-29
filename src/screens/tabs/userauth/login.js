import React, { Fragment } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Dimensions, } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Theme from '../../../Theme';
import IconMaterialIcons from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { loginSelector, clearErrors, onLoginPressed } from '../../../redux/slices/loginSlice';
import PageSpinner from '../../../components/common/PageSpinner';
import * as yup from 'yup';
import { Formik } from 'formik';

export default function LoginPage({ navigation }) {

  const dispatch = useDispatch();
  const { loading, loginPasswordError, loginEmailError } = useSelector(loginSelector);
  const [hidePassword, sethidePassword] = React.useState(true);
  const [eyeicon, seteyeicon] = React.useState('eye');


  const toggleEyeIcon = () => {
    if (eyeicon === 'eye') {
      seteyeicon('eye-off');
      sethidePassword(false);
    } else {
      seteyeicon('eye');
      sethidePassword(true);
    }
  };


  const headerComponent = () => {
    return (
      <View style={styles.headerComponent}>
        <Text style={styles.headerComponentText}>Welcome Back!</Text>
        <Image
          style={styles.backgroundImage}
          resizeMode={'stretch'}
          source={require('../../../assets/img/login.png')}
        />
      </View>
    );
  };


  const inputComponent = () => {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values =>
          dispatch(
            onLoginPressed({
              email: values.email,
              password: values.password,
              onSuccess: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Profile' }],
                });
              },
            }),
          )
        }
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email()
            .required(),
          password: yup
            .string()
            .min(5)
            .required(),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
            <Fragment>
              <View style={styles.inputComponentStyle}>
                <Input
                  placeholder="Email"
                  leftIcon={{ type: 'Feather', name: 'mail', size: 20 }}
                  errorMessage={loginEmailError}
                  value={values.email}
                  onChangeText={e => {
                    handleChange('email')(e);
                    dispatch(clearErrors());
                  }}
                  containerStyle={{ width: 310 }}
                  inputStyle={{ fontSize: 16 }}
                  onBlur={() => setFieldTouched('email')}
                />
                {touched.email && errors.email && (
                  <Text style={{ fontSize: 13, color: 'red' }}>
                    {errors.email}
                  </Text>
                )}
                <Input
                  placeholder="Password"
                  secureTextEntry={hidePassword}
                  leftIcon={<IconMaterialIcons name="lock" size={20} />}
                  rightIcon={
                    <IconMaterialIcons
                      name={eyeicon}
                      size={20}
                      margin="10"
                      onPress={toggleEyeIcon}
                    />
                  }
                  inputStyle={{ fontSize: 16 }}
                  errorMessage={loginPasswordError}
                  value={values.password}
                  containerStyle={{ width: 310 }}
                  onChangeText={e => {
                    handleChange('password')(e);
                    dispatch(clearErrors());
                  }}
                  onBlur={() => setFieldTouched('password')}
                />
                {touched.password && errors.password && (
                  <Text style={{ fontSize: 13, color: 'red' }}>
                    {errors.password}
                  </Text>
                )}
              </View>
              <Button
                title="Sign in"
                disabled={!isValid}
                type="solid"
                containerStyle={styles.loginButton}
                onPress={handleSubmit}
              />
            </Fragment>
          )}
      </Formik>
    );
  };


  const buttonComponent = () => {
    return (
      <View>
        <Button title="Forgot password?" type="clear" containerStyle={styles.forgotButton} onPress={() => navigation.navigate('ForgotPassword')} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text>Don't have an account?</Text>
          <Button title="Register" type="clear" containerStyle={styles.register} onPress={() => navigation.navigate('Signup')} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.MainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {headerComponent()}
        {inputComponent()}
        {buttonComponent()}
        <PageSpinner visible={loading} />
      </ScrollView>
    </View>
  );
}

const win = Dimensions.get('window');
// const ratio = win.height / 3600;

const styles = StyleSheet.create({
  headerComponent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerComponentText: {
    // fontWeight: 'bold',
    fontSize: 25,
    letterSpacing: 1,
    marginBottom: 20,
  },
  inputComponentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // width: 250,
    // paddingHorizontal: 8
  },
  backgroundImage: {
    // marginTop: 5,
    width: win.width / 1.2,
    height: win.height / 3,
    marginBottom: 30,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 30,
  },
  loginButton: {
    alignSelf: 'center',
    marginVertical: Theme.spacing.small,
    width: 150,
    borderRadius: 20,
  },
  forgotButton: {
    // paddingVertical: Theme.spacing.tiny,
    // paddingRight: Theme.spacing.small,
    marginLeft: 2,
  },
  register: {
    // paddingVertical: Theme.spacing.tiny,
    // paddingRight: Theme.spacing.small,
    marginLeft: 7,
  },
});
