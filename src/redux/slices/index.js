import { combineReducers } from 'redux';

import postReducer from './post';
import searchReducer from './searchSlice';
import loginReducer from './loginSlice';
import signupReducer from './signupSlice';
import forgotPasswordReducer from './forgotPasswordSlice';
import chatReducer from './chatSlice';
import changeProfileReducer from './changeProfileSlice';
import notificationReducer from './notificationSlice';


const rootReducer = combineReducers({
  post: postReducer,
  search: searchReducer,
  login: loginReducer,
  signup: signupReducer,
  forgotPassword: forgotPasswordReducer,
  chat: chatReducer,
  changeProfile: changeProfileReducer,
  notification: notificationReducer
});

export default rootReducer;
