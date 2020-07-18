import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { validateNewUserUrl, validateOtpUrl } from '../urls';
import { replace } from 'formik';

export const initialState = {
    loading: false,
    signupResponse: '',
    signupPassword: '',
    signupPasswordError: '',
    signupEmail: '',
    signupEmailError: '',
    signupError: '',
    signupPhonenumber: '',
    signupPhonenumberError: '',
    signupUsername: '',
    signupUsernameError: '',
    signupOtp: '',
    signupOtpError: ''

};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        signupStarted: state => {
            state.loading = true;
        },
        signupSuccess: (state, { payload }) => {
            state.signupResponse = payload;
            state.loading = false;
            state.signupEmailError = '';
            state.signupUsernameError = '';
            state.signupPhonenumberError = '';
            state.signupPasswordError = '';
            state.signupOtpError = ''
        },
        signupEmailChanged: (state, { payload }) => {
            state.signupEmailError = '';
            state.signupUsernameError = '';
            state.signupPhonenumberError = '';
            state.signupEmail = payload
        },
        signupUsernameChanged: (state, { payload }) => {
            state.signupEmailError = '';
            state.signupUsernameError = '';
            state.signupPhonenumberError = '';
            state.signupUsername = payload
        },
        signupPhonenumberChanged: (state, { payload }) => {
            state.signupEmailError = '';
            state.signupUsernameError = '';
            state.signupPhonenumberError = '';
            state.signupPhonenumber = payload
        },
        signupPasswordChanged: (state, { payload }) => {
            state.signupPasswordError = '';
            state.signupOtpError = '';
            state.signupPassword = payload
        },
        clearErrors: state => {
            state.signupPasswordError = '';
            state.signupOtpError = '';
            state.signupEmailError = '';
            state.signupUsernameError = '';
            state.signupPhonenumberError = '';
            state.signupError = ''
        },
        signupFailure: state => {
            state.loading = false;
            state.signupError = "Something went wrong, please try again later!"
        },
        passwordIncorrect: (state, { payload }) => {
            state.signupPasswordError = payload
            state.loading = false;
        },
        EmailIncorrect: (state, { payload }) => {
            state.signupEmailError = payload
            state.loading = false;
        },
        usernameIncorrect: (state, { payload }) => {
            state.signupUsernameError = payload
            state.loading = false;
        },
        PhonenumberIncorrect: (state, { payload }) => {
            state.signupPhonenumberError = payload
            state.loading = false;
        },
        otpIncorrect: (state, { payload }) => {
            state.signupOtpError = payload
            state.loading = false;
        }
    },
});

export const {
    signupStarted,
    signupSuccess,
    signupEmailChanged,
    signupUsernameChanged,
    signupPhonenumberChanged,
    signupPasswordChanged,
    signupFailure,
    clearErrors,
    passwordIncorrect,
    EmailIncorrect,
    usernameIncorrect,
    PhonenumberIncorrect,
    otpIncorrect
} = signupSlice.actions;

export const signupSelector = state => state.signup;

export default signupSlice.reducer;

export function onSignupPressed(param) {
    console.log("insidesignup")

    return async (dispatch, state) => {
        console.log(param.email)
        console.log(param.username)
        console.log(param.phonenumber)
        dispatch(signupStarted());

        try {
            console.log("insdie try")
            const response = await axios.post(validateNewUserUrl, {
                devicetoken: "ctOFt562a0I:APA91bF4WphQBqewerR2p9_pwYxzOXZPT5zH2iWM1L-suCgBRRWop9uqoUJsGfjS2kgWT3bRSxTzPUrpHeK4d_v4PrsC_HCN8KTMS_Uhf5-7FMw7RmJjuSzEkvS0HRzkD8-_EjyXdywu",
                username: param.username,
                email: param.email,
                phonenumber: param.phonenumber
            });
            console.log(response.data)
            if (response) {
                if (response.data["status"] === "404") {
                    if (response.data["field"] == 'email') {
                        dispatch(EmailIncorrect(response.data["error"]));
                    }
                    if (response.data["field"] == 'username') {
                        dispatch(usernameIncorrect(response.data["error"]));
                    }
                    if (response.data["field"] == 'phonenumber') {

                        dispatch(PhonenumberIncorrect(response.data["error"]));
                    }
                }
                else {
                    const responsestatus = JSON.stringify(response.data.status)
                    dispatch(signupSuccess(responsestatus));
                    param.onSuccess();
                }

            }
            else {
                dispatch(signupFailure());
            }
        } catch (error) {
            dispatch(signupFailure());
        }
    };
}


export function onSignupOtpPressed(param) {
    console.log("insideonlogin")

    return async (dispatch, state) => {
        console.log(param.email)
        dispatch(signupStarted());

        try {
            const response = await axios.post(validateOtpUrl, {
                devicetoken: "ctOFt562a0I:APA91bF4WphQBqewerR2p9_pwYxzOXZPT5zH2iWM1L-suCgBRRWop9uqoUJsGfjS2kgWT3bRSxTzPUrpHeK4d_v4PrsC_HCN8KTMS_Uhf5-7FMw7RmJjuSzEkvS0HRzkD8-_EjyXdywu",
                email: param.email,
                otp: param.otp,
                password: param.password,
            });
            console.log(response.data)
            if (response) {
                if (response.data["status"] === "404") {
                    if (response.data["field"] == 'otp') {
                        dispatch(otpIncorrect(response.data["error"]));
                    }
                    if (response.data["field"] == 'password') {
                        dispatch(passwordIncorrect(response.data["error"]));
                    }

                }
                else {
                    dispatch(signupSuccess(response.data[0]));
                    param.onSuccess();
                }

            }
            else {
                dispatch(signupFailure());
            }
        } catch (error) {
            dispatch(signupFailure());
        }
    };
}
