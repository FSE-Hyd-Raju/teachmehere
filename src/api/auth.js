import axios from 'axios';
import {
  NEW_SESSION,
  NEW_GUEST_SESSION,
  NEW_REQUEST_TOKEN,
  VALIDATE_TOKEN_WITH_LOGIN,
  AUTHENTICATE_NEW_USER,
  ACCOUNT_DETAILS,
  VALIDATE_USER_WITH_OTP,
  RESET_PASSWORD_URL,
  UPDATE_PROFILE_WITH_ID_URL
} from '../api/urls';
import Config from '../Config';
import { Alert } from 'react-native';

export const requestToCreateNewGuestUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: { guest_session_id: sessionId },
      } = await axios.get(NEW_GUEST_SESSION);

      resolve({ sessionId });
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const requestToCreateNewAuthenticatedUser = ({ username, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      // const {
      //   data: { request_token },
      // } = await axios.get(NEW_REQUEST_TOKEN);

      // alert(request_token)

      // alert(username, password)
      const response = await axios.post(VALIDATE_TOKEN_WITH_LOGIN, {
        devicetoken: "ctOFt562a0I:APA91bF4WphQBqewerR2p9_pwYxzOXZPT5zH2iWM1L-suCgBRRWop9uqoUJsGfjS2kgWT3bRSxTzPUrpHeK4d_v4PrsC_HCN8KTMS_Uhf5-7FMw7RmJjuSzEkvS0HRzkD8-_EjyXdywu",
        email: username,
        password: password,
      });
      //alert(JSON.stringify(response.data[0]._id))
      // console.log(response.json())
      // const {
      //   data: { session_id },
      // } = await axios.post(NEW_SESSION, { request_token });

      const accountId = response.data[0]._id

      // alert(accountId)
      resolve({ accountId });
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

  export const requestToCreateNewAuthUser = ({ username, email, phonenumber }) =>
  new Promise(async (resolve, reject) => {
    try {
      // const {
      //   data: { request_token },
      // } = await axios.get(NEW_REQUEST_TOKEN);

      // alert(request_token)

      // alert(username, password)
      const response = await axios.post(AUTHENTICATE_NEW_USER, {
        devicetoken: "ctOFt562a0I:APA91bF4WphQBqewerR2p9_pwYxzOXZPT5zH2iWM1L-suCgBRRWop9uqoUJsGfjS2kgWT3bRSxTzPUrpHeK4d_v4PrsC_HCN8KTMS_Uhf5-7FMw7RmJjuSzEkvS0HRzkD8-_EjyXdywu",
        email: email,
        username: username,
        phonenumber: phonenumber,
      });
      //alert(JSON.stringify(response.data[0]._id))
      // console.log(response.json())
      // const {
      //   data: { session_id },
      // } = await axios.post(NEW_SESSION, { request_token });
      //alert(JSON.stringify(response.data.status))

      const responsestatus = JSON.stringify(response.data.status)


      // alert(accountId)
      resolve({ responsestatus });
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });


  export const requestToCreateNewAut2hUser = ({  email,otp, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      // const {
      //   data: { request_token },
      // alert("api")
      // } = await axios.get(NEW_REQUEST_TOKEN);

      // alert(request_token)

      // alert(username, password)
      const response = await axios.post(VALIDATE_USER_WITH_OTP, {
        devicetoken: "ctOFt562a0I:APA91bF4WphQBqewerR2p9_pwYxzOXZPT5zH2iWM1L-suCgBRRWop9uqoUJsGfjS2kgWT3bRSxTzPUrpHeK4d_v4PrsC_HCN8KTMS_Uhf5-7FMw7RmJjuSzEkvS0HRzkD8-_EjyXdywu",
        email: email,
        otp: otp,
        password: password,
      });

      //alert(JSON.stringify(response.data[0]._id))
      // console.log(response.json())
      // const {
      //   data: { session_id },
      // } = await axios.post(NEW_SESSION, { request_token });
      //alert(JSON.stringify(response.data.status))
      const accountId = JSON.stringify(response.data[0]._id)

      // alert(accountId)
      resolve({ accountId });
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

  export const requestToCreateNewPassword = ({  email }) =>
  new Promise(async (resolve, reject) => {
    try {
      // const {
      //   data: { request_token },
      // } = await axios.get(NEW_REQUEST_TOKEN);

      // alert(request_token)

      // alert(username, password)
      const response = await axios.post(RESET_PASSWORD_URL, {
        devicetoken: "ctOFt562a0I:APA91bF4WphQBqewerR2p9_pwYxzOXZPT5zH2iWM1L-suCgBRRWop9uqoUJsGfjS2kgWT3bRSxTzPUrpHeK4d_v4PrsC_HCN8KTMS_Uhf5-7FMw7RmJjuSzEkvS0HRzkD8-_EjyXdywu",
        email: email,
      });
      //alert(JSON.stringify(response.data[0]._id))
      // console.log(response.json())
      // const {
      //   data: { session_id },
      // } = await axios.post(NEW_SESSION, { request_token });
      //alert(JSON.stringify(response.data.status))

      const responsestatus = JSON.stringify(response.data.status)

      // alert(accountId)
      resolve({ responsestatus });
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });


  export const requestToUpdateAuthUser = ({ username, description, phonenumber, userId }) =>
  new Promise(async (resolve, reject) => {
  
    try {
      
   
      const response = await axios.post(UPDATE_PROFILE_WITH_ID_URL, {
        devicetoken: "ctOFt562a0I:APA91bF4WphQBqewerR2p9_pwYxzOXZPT5zH2iWM1L-suCgBRRWop9uqoUJsGfjS2kgWT3bRSxTzPUrpHeK4d_v4PrsC_HCN8KTMS_Uhf5-7FMw7RmJjuSzEkvS0HRzkD8-_EjyXdywu",
        description: description,
        username: username,
        phonenumber: phonenumber,
        _id:userId
      });
      //alert(JSON.stringify(response.data[0]._id))
      // console.log(response.json())
      // const {
      //   data: { session_id },
      // } = await axios.post(NEW_SESSION, { request_token });
      //alert(JSON.stringify(response.data.status))

    //   const responsestatus = JSON.stringify(response.data.status)


    //   // alert(accountId)
    //   resolve({ responsestatus });
    // } catch (error) {
    //   Config.logNetworkErrors && console.log(error);
    //   reject(error);
    // }

    const accountId = response.data[0]._id

    //alert(accountId)
    resolve({ accountId });
  } catch (error) {
    Config.logNetworkErrors && console.log(error);
    reject(error);
  }
  });