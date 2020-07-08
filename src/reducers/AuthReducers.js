import { Auth } from '../actions/types';

const INITIAL_STATE = {
  loginUsername: '',
  loginPassword: '',
  loginUsernameError: '',
  loginPasswordError: '',
  loginEmail: '',
  loginEmailError: '',
  loginPhoneNumber: '',
  loginPhoneNumberError: '',
  loginDescription:'',
  loginOTP:'',
  loginOTPError:'',
  loginIsLoading: false,
  signupIsLoading: false,
  isGuestSessionCreating: false,
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Auth.USERNAME_CHANGED:
      return {
        ...state,
        loginUsernameError: '',
        loginUsername: action.payload,
      };
    case Auth.USERNAME_INCORRECT:
      return { ...state, loginUsernameError: action.payload };
    case Auth.PASSWORD_CHANGED:
      return {
        ...state,
        loginPasswordError: '',
        loginPassword: action.payload,
      };
    case Auth.PASSWORD_INCORRECT:
      return { ...state, loginPasswordError: action.payload };
  
    case Auth.OTP_CHANGED:
      return {
        ...state,
        loginOTPError: '',
        loginOTP: action.payload,
    
        
      };
    case Auth.OTP_INCORRECT:
      console.log("acth reducer")
     return { ...state, loginOTPError: action.payload };
    case Auth.LOGIN_USER_ATTEMPT:
      return {
        ...state,
        loginUsernameError: '',
        loginPasswordError: '',
        loginIsLoading: true,
      };
    case Auth.LOGIN_USER_SUCCESS:
      return { ...INITIAL_STATE, user: action.payload };
    case Auth.LOGIN_USER_FAIL:
      return { ...state,  loginEmail: '', loginPassword: '', 
       loginIsLoading: false };
    case Auth.SIGNUP2_USER_ATTEMPT:
      return {
        ...state,
        loginOTPError: '',
        loginPasswordError: '',
        signupIsLoading: true,
      };
    case Auth.SIGNUP_USER_ATTEMPT:
      return {
        ...state,
        loginUsernameError: '',
        loginEmailError: '',
        loginPhoneNumberError: '',
        signupIsLoading: true,
    };
    case Auth.PHONENUMBER_CHANGED:
      return {
        ...state,
        loginPhoneNumber: action.payload,
        loginPhoneNumberError: '',
     
      };
    case Auth.EMAIL_CHANGED:
      return {
        ...state,
        loginEmail: action.payload,
        loginEmailError: '',
       
      };
    case Auth.DESCRIPTION_CHANGED:
      return {
        ...state,
        loginDescription: action.payload,
        // loginEmailError: '',
        
      };
    case Auth.EMAIL_INCORRECT:
      return { ...state, loginEmailError: action.payload };  
    case Auth.OTP_INCORRECT:
      return { ...state, loginOtpError: action.payload };  
    case Auth.PHONENUMBER_INCORRECT:
      return { ...state, loginPhoneNumberError: action.payload };
    case Auth.SIGNUP_USER_SUCCESS:
      return { ...INITIAL_STATE,  signupIsLoading: false };
    case Auth.SIGNUP_USER_FAIL:
      return { ...state,
      signupIsLoading: false };
  
    case Auth.SIGNUP2_USER_SUCCESS:
      return { ...INITIAL_STATE, user: action.payload };

    case Auth.SIGNUP2_USER_FAIL:
      return { ...state,
      signupIsLoading: false };

    case Auth.CREATE_GUEST_SESSION_ATTEMPT:
      return { ...state, isGuestSessionCreating: true };
    case Auth.CREATE_GUEST_SESSION_SUCCESS:
      return { ...state, isGuestSessionCreating: false, user: action.payload };
    case Auth.CREATE_GUEST_SESSION_FAIL:
      return { ...state, isGuestSessionCreating: false };
    case Auth.CLEAR_LOGIN_FIELDS:
      return {
        ...state,
        loginUsername: '',
        loginPassword: '',
        loginUsernameError: '',
        loginPasswordError: '',
      };
    case Auth.CLEAR_SIGNUP_FIELDS:
      return {
        ...state,
        loginUsername: '',
        loginUsernameError: '',
        loginEmail: '',
        loginEmailError: '',
        loginPhoneNumber: '',
        loginPhoneNumberError: '',
      };
    case Auth.USER_LOADED:
      return { ...INITIAL_STATE, user: action.payload };
    case Auth.LOG_OUT:
      return { ...INITIAL_STATE };
    default:
      return { ...state };
  }
};
