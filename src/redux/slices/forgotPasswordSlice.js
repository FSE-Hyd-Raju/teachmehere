import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { forgotPasswordUrl, validateOtpUrl } from '../urls';
import { replace } from 'formik';

export const initialState = {
    loading: false,
    resetPasswordResponse: '',
    loginPassword: '',
    loginPasswordError: '',
    loginEmail: '',
    loginEmailError: '',
    loginOtp: '',
    loginOtpError: '',
    loginError: ''

};

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {
        resetPasswordStarted: state => {
            state.loading = true;
        },
        resetPasswordSuccess: (state, { payload }) => {
            state.resetPasswordResponse = payload;
            state.loading = false;
            state.loginEmailError = '';
            state.loginPasswordError = '';
            state.loginOtpError = ''
        },
        loginEmailChanged: (state, { payload }) => {
            state.loginEmailError = '';
            state.loginPasswordError = '';
            state.loginOtpError = '';
            state.loginEmail = payload
        },
        loginPasswordChanged: (state, { payload }) => {
            state.loginOtpError = '';
            state.loginEmailError = '';
            state.loginPasswordError = '';
            state.loginPassword = payload
        },
        loginOtpChanged: (state, { payload }) => {
            state.loginEmailError = '';
            state.loginOtpError = '';
            state.loginPasswordError = '';
            state.loginOtp = payload
        },
        resetPasswordFailure: state => {
            state.loading = false;
            state.signupError = "Something went wrong, please try again later!"
        },
        passwordIncorrect: (state, { payload }) => {
            state.loginPasswordError = payload
            state.loading = false;
        },
        EmailIncorrect: (state, { payload }) => {
            state.loginEmailError = payload
            state.loading = false;
        },
        otpIncorrect: (state, { payload }) => {
            state.loginOtpError = payload
            state.loading = false;
        }
    },
});

export const {
    resetPasswordStarted,
    resetPasswordSuccess,
    loginEmailChanged,
    loginPasswordChanged,
    loginOtpChanged,
    resetPasswordFailure,
    passwordIncorrect,
    EmailIncorrect,
    otpIncorrect
} = forgotPasswordSlice.actions;

export const resetPasswordSelector = state => state.forgotPassword;

export default forgotPasswordSlice.reducer;

export function onforgotPasswordPressed(param) {
    console.log("insideonlogin")

    return async (dispatch, state) => {
        console.log(param.email)
        dispatch(resetPasswordStarted());

        try {
            const response = await axios.post(forgotPasswordUrl, {
                devicetoken: "ctOFt562a0I:APA91bF4WphQBqewerR2p9_pwYxzOXZPT5zH2iWM1L-suCgBRRWop9uqoUJsGfjS2kgWT3bRSxTzPUrpHeK4d_v4PrsC_HCN8KTMS_Uhf5-7FMw7RmJjuSzEkvS0HRzkD8-_EjyXdywu",
                email: param.email,
            });
            console.log(response.data)
            if (response) {
                if (response.data["status"] === "404") {
                    if (response.data["field"] == 'email') {
                        dispatch(EmailIncorrect(response.data["error"]));
                    }
                }
                else {
                    const responsestatus = JSON.stringify(response.data.status)
                    dispatch(resetPasswordSuccess(responsestatus));
                    param.onSuccess();
                }

            }
            else {
                dispatch(resetPasswordFailure());
            }
        } catch (error) {
            dispatch(resetPasswordFailure());
        }
    };
}


export function onOtpPressed(param) {
    console.log("insideonlogin")

    return async (dispatch, state) => {
        console.log(param.email)
        dispatch(resetPasswordStarted());

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
                    dispatch(resetPasswordSuccess(response.data[0]));
                    param.onSuccess();
                }

            }
            else {
                dispatch(resetPasswordFailure());
            }
        } catch (error) {
            dispatch(resetPasswordFailure());
        }
    };
}

