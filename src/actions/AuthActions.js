import { Auth } from './types';
import { validateUsername, validatePassword, validateEmail, validatePhoneNumber } from '../utils/validators';
import {
  stSaveUser,
  stRemoveUser,
  stRemoveCurrentSkills,
} from '../utils/storage';
import {
  requestToCreateNewGuestUser,
  requestToCreateNewAuthenticatedUser,
  requestToCreateNewAuthUser,
  requestToCreateNewAut2hUser,
  requestToCreateNewPassword,
  requestToUpdateAuthUser,
  requestToUpdateUserProfilePic
} from '../api/auth';
import { getTmdbErrorMessage } from '../api/codes';
import RouteNames from '../RouteNames';
import Config from '../Config';

export const clearLoginFields = () => ({ type: Auth.CLEAR_LOGIN_FIELDS });
export const loadUserIntoRedux = user => ({
  type: Auth.USER_LOADED,
  payload: user,
});
export const loginUsernameChanged = text => ({
  type: Auth.USERNAME_CHANGED,
  payload: text,
});
export const loginPasswordChanged = text => ({
  type: Auth.PASSWORD_CHANGED,
  payload: text,
});
export const loginDescriptionChanged = text => ({
  type: Auth.DESCRIPTION_CHANGED,
  payload: text,
});

export const signupUsernameChanged = text => ({
  type: Auth.USERNAME_CHANGED,
  payload: text,
});
export const loginEmailChanged = text => ({
  type: Auth.EMAIL_CHANGED,
  payload: text,
});
export const loginOTPChanged = text => ({
  type: Auth.OTP_CHANGED,
  payload: text,
});
export const loginPhoneNumberChanged = text => ({
  type: Auth.PHONENUMBER_CHANGED,
  payload: text,
});

export const logOutUser = navigation => dispatch => {
  stRemoveUser();
  stRemoveCurrentSkills();
  navigation.navigate(RouteNames.AuthStack);
  dispatch({ type: Auth.LOG_OUT });
};

export const createGuestSession = ({
  showToast,
  onSuccess,
}) => async dispatch => {
  dispatch({ type: Auth.CREATE_GUEST_SESSION_ATTEMPT });

  try {
    const { sessionId } = await requestToCreateNewGuestUser();

    dispatch({
      type: Auth.CREATE_GUEST_SESSION_SUCCESS,
      payload: createUser( sessionId ),
    });
    onSuccess();
  } catch (error) {
    showToast && showToast('Something went wrong. Please try again later.');
    dispatch({ type: Auth.CREATE_GUEST_SESSION_FAIL });
  }
};

export const loginUser = ({
  username,
  password,
  showToast,
  onSuccess,
}) => async dispatch => {
  const usernameValidator = validateUsername(username);
  const passwordValidator = validatePassword(password);
  const isValidCredentials =
    usernameValidator.isValid && passwordValidator.isValid;

  if (!isValidCredentials) {
    dispatch({
      type: Auth.USERNAME_INCORRECT,
      payload: usernameValidator.message,
    });
    dispatch({
      type: Auth.PASSWORD_INCORRECT,
      payload: passwordValidator.message,
    });
    return;
  }

  dispatch({ type: Auth.LOGIN_USER_ATTEMPT });

  try {
    const { accountId } = await requestToCreateNewAuthenticatedUser({
      username,
      password,
    });
    dispatch({
      type: Auth.LOGIN_USER_SUCCESS,
      payload: createUser( accountId, username ),
    });
    onSuccess();
  } catch (error) {
    const isUnauthorized = error.response && error.response.status === 401;
    if (!isUnauthorized && showToast) {
      showToast('Something went wrong. Please try again later.');
    }
    const errMessage = isUnauthorized
      ? getTmdbErrorMessage(error.response.data.status_code)
      : '';
    dispatch({ type: Auth.LOGIN_USER_FAIL, payload: errMessage });
  }
};

export const signupUser1 = ({
  username,
  email,
  phonenumber,
  showToast,
  onSuccess,
}) => async dispatch => {
  const usernameValidator = validateUsername(username);
  const emailValidator = validateEmail(email);
  const phonenumberValidator = validatePhoneNumber(phonenumber);
  const isValidCredentials =
    usernameValidator.isValid && emailValidator.isValid && phonenumberValidator.isValid;

  if (!isValidCredentials) {
    dispatch({
      type: Auth.USERNAME_INCORRECT,
      payload: usernameValidator.message,
    });
    dispatch({
      type: Auth.EMAIL_INCORRECT,
      payload: emailValidator.message,
    });
    dispatch({
      type: Auth.PHONENUMBER_INCORRECT,
      payload: phonenumberValidator.message,
    });
    return;
  }

  dispatch({ type: Auth.SIGNUP_USER_ATTEMPT });

  try {
    const { responsestatus } = await requestToCreateNewAuthUser({
      username,
      email,
      phonenumber
    });
    dispatch({ type: Auth.SIGNUP_USER_SUCCESS });
    onSuccess();
  } catch (error) {
    const isUnauthorized = error.response && error.response.status === 401;
    if (!isUnauthorized && showToast) {
      showToast('Something went wrong. Please try again later.');
    }
    const errMessage = isUnauthorized
      ? getTmdbErrorMessage(error.response.data.status_code)
      : '';
    dispatch({ type: Auth.SIGNUP_USER_FAIL, payload: errMessage });
  }
};


export const signupUser2 = ({
  email,
  otp,
  password,
  showToast,
  onSuccess,
}) => async dispatch => {
  // const passwordValidator = validatePassword(password);
  // const OtpValidator = validateOtp(otp);
  // // const phonenumberValidator = validatePhoneNumber(phonenumber);
  // const isValidCredentials =
  // OtpValidator.isValid  && passwordValidator.isValid;
  // if (!isValidCredentials) {
  //   dispatch({
  //     type: Auth.OTP_INCORRECT,
  //     payload: otpValidator.message,
  //   });
  //   dispatch({
  //     type: Auth.PASSWORD_INCORRECT,
  //     payload: passwordValidator.message,
  //   });
  //   return;
  // }

  dispatch({ type: Auth.SIGNUP2_USER_ATTEMPT });
  try {
    const { accountId } = await requestToCreateNewAut2hUser({
      otp,
      email,
      password
    });
    dispatch({
      type: Auth.SIGNUP2_USER_SUCCESS,
      payload: createUser( accountId, email ),
    });
    onSuccess();
  } catch (error) {
    const isUnauthorized = error.response && error.response.status === 401;
    if (!isUnauthorized && showToast) {
      showToast('Something went wrong. Please try again later.');
    }
    const errMessage = isUnauthorized
      ? getTmdbErrorMessage(error.response.data.status_code)
      : '';
    dispatch({ type: Auth.SIGNUP_USER_FAIL, payload: errMessage });
  }
};

export const ResetPassword = ({
  email,
  showToast,
  onSuccess,
}) => async dispatch => {
  // const usernameValidator = validateUsername(username);
  // const emailValidator = validateEmail(email);
  // const phonenumberValidator = validatePhoneNumber(phonenumber);
  // const isValidCredentials =
  //   usernameValidator.isValid && emailValidator.isValid && phonenumberValidator.isValid;

  // if (!isValidCredentials) {
  //   dispatch({
  //     type: Auth.USERNAME_INCORRECT,
  //     payload: usernameValidator.message,
  //   });
  //   dispatch({
  //     type: Auth.EMAIL_INCORRECT,
  //     payload: emailValidator.message,
  //   });
  //   dispatch({
  //     type: Auth.PHONENUMBER_INCORRECT,
  //     payload: phonenumberValidator.message,
  //   });
  //   return;
  // }

  dispatch({ type: Auth.SIGNUP_USER_ATTEMPT });

  try {
    const { responsestatus } = await requestToCreateNewPassword({
      email,
    });
    dispatch({ type: Auth.SIGNUP_USER_SUCCESS });
    onSuccess();
  } catch (error) {
    const isUnauthorized = error.response && error.response.status === 401;
    if (!isUnauthorized && showToast) {
      showToast('Something went wrong. Please try again later.');
    }
    const errMessage = isUnauthorized
      ? getTmdbErrorMessage(error.response.data.status_code)
      : '';
    dispatch({ type: Auth.SIGNUP_USER_FAIL, payload: errMessage });
  }
};
export const updateProfilePic = ({
  userId,
  displaypic,
  showToast,
  onSuccess,
}) => async dispatch => {
  dispatch({ type: Auth.SIGNUP_USER_ATTEMPT });

  console.log("inside profile pic auth action")
  console.log(userId)
  try {
   
    console.log("inside authaction")
  
    const { accountId } = await requestToUpdateUserProfilePic({
      userId,
      displaypic
    
    });
    dispatch({
      type: Auth.SIGNUP2_USER_SUCCESS,
      payload: createUser( accountId, email ),
    });
    onSuccess();
  }
  catch (error) {
    const isUnauthorized = error.response && error.response.status === 401;
    if (!isUnauthorized && showToast) {
      showToast('Something went wrong. Please try again later.');
    }
    const errMessage = isUnauthorized
      ? getTmdbErrorMessage(error.response.data.status_code)
      : '';
    dispatch({ type: Auth.SIGNUP_USER_FAIL, payload: errMessage });
  }
};

  
export const updateProfile = ({
  username,
  description,
  phonenumber,
  userId,
  email,
  showToast,
  onSuccess,
}) => async dispatch => {
  
  // const usernameValidator = validateUsername(username);
  // const phonenumberValidator = validatePhoneNumber(phonenumber);
  // const isValidCredentials =
  //   usernameValidator.isValid && phonenumberValidator.isValid;

  // if (!isValidCredentials) {
  //   dispatch({
  //     type: Auth.USERNAME_INCORRECT,
  //     payload: usernameValidator.message,
  //   });
  //   dispatch({
  //     type: Auth.PHONENUMBER_INCORRECT,
  //     payload: phonenumberValidator.message,
  //   });
  //   return;
  // }

  dispatch({ type: Auth.SIGNUP_USER_ATTEMPT });


  try {
    const { accountId } = await requestToUpdateAuthUser({
      username,
      description,
      phonenumber,
      userId,
    
    });
    dispatch({
      type: Auth.SIGNUP2_USER_SUCCESS,
      payload: createUser( accountId, email ),
    });
    onSuccess();
  }
  catch (error) {
    const isUnauthorized = error.response && error.response.status === 401;
    if (!isUnauthorized && showToast) {
      showToast('Something went wrong. Please try again later.');
    }
    const errMessage = isUnauthorized
      ? getTmdbErrorMessage(error.response.data.status_code)
      : '';
    dispatch({ type: Auth.SIGNUP_USER_FAIL, payload: errMessage });
  }
};


// Local functions
const createUser = ( accountId, username) => {


  const isGuest = !accountId;
  const user = { isGuest, accountId, username };

  Config.logGeneral && console.log('Creating user: ', user);
  stSaveUser(user);
  return user;
};
