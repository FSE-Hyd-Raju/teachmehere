import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { authLoginUrl } from '../urls';
import { replace } from 'formik';

export const initialState = {
    loading: false,
    loginResponse: '',
    loginPassword: '',
    loginPasswordError: '',
    loginEmail: '',
    loginEmailError: '',
    loginError: ''
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStarted: state => {
            state.loading = true;
        },
        loginSuccess: (state, { payload }) => {
            state.loginResponse = payload;
            state.loading = false;
            state.loginEmailError = '';
            state.loginPasswordError = '';
        },
        loginEmailChanged: (state, { payload }) => {
            state.loginEmailError = '';
            state.loginPasswordError = '';
            state.loginEmail = payload
        },
        loginPasswordChanged: (state, { payload }) => {
            state.loginEmailError = '';
            state.loginPasswordError = '';
            state.loginPassword = payload
        },
        loginFailure: state => {
            state.loading = false;
            state.loginError = "Something went wrong, please try again later!"
        },
        passwordIncorrect: (state, { payload }) => {
            state.loginPasswordError = payload
            state.loading = false;
        },
        EmailIncorrect: (state, { payload }) => {
            state.loginEmailError = payload
            state.loading = false;
        }
    },
});

export const {
    loginStarted,
    loginSuccess,
    loginEmailChanged,
    loginPasswordChanged,
    loginFailure,
    passwordIncorrect,
    EmailIncorrect
} = loginSlice.actions;

export const loginSelector = state => state.login;

export default loginSlice.reducer;

export function onLoginPressed(param) {
    console.log("insideonlogin")

    return async (dispatch, state) => {
        console.log(param.email)
        dispatch(loginStarted());

        try {
            const response = await axios.post(authLoginUrl, {
                devicetoken: "ctOFt562a0I:APA91bF4WphQBqewerR2p9_pwYxzOXZPT5zH2iWM1L-suCgBRRWop9uqoUJsGfjS2kgWT3bRSxTzPUrpHeK4d_v4PrsC_HCN8KTMS_Uhf5-7FMw7RmJjuSzEkvS0HRzkD8-_EjyXdywu",
                email: param.email,
                password: param.password
            });
            console.log(response.data)
            if (response) {
                if (response.data["status"] === "404") {
                    if (response.data["field"] == 'email') {
                        dispatch(EmailIncorrect(response.data["error"]));
                    }
                    if (response.data["field"] == 'password') {
                        dispatch(passwordIncorrect(response.data["error"]));
                    }
                }
                else {
                    dispatch(loginSuccess(response.data[0]));
                    param.onSuccess();
                }

            }
            else {
                dispatch(loginFailure());
            }
        } catch (error) {
            dispatch(loginFailure());
        }
    };
}
