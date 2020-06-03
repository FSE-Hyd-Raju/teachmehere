import axios from 'axios';
import {
  NEW_SESSION,
  NEW_GUEST_SESSION,
  NEW_REQUEST_TOKEN,
  VALIDATE_TOKEN_WITH_LOGIN,
  ACCOUNT_DETAILS,
} from '../api/urls';
import Config from '../Config';

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

      const accountId = JSON.stringify(response.data[0]._id)

      // alert(accountId)
      resolve({ accountId });
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });
