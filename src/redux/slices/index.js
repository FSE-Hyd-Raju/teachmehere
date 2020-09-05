import { combineReducers } from 'redux';

import postReducer from './post';
import searchReducer from './searchSlice';
import loginReducer from './loginSlice';
import signupReducer from './signupSlice';
import forgotPasswordReducer from './forgotPasswordSlice';
import chatReducer from './chatSlice';
import changeProfileReducer from './changeProfileSlice';
import notificationReducer from './notificationSlice';
import profileReducer from './profileSlice';

const rootReducer = combineReducers({
  post: postReducer,
  search: searchReducer,
  login: loginReducer,
  signup: signupReducer,
  forgotPassword: forgotPasswordReducer,
  chat: chatReducer,
  changeProfile: changeProfileReducer,
  notification: notificationReducer,
  profile: profileReducer
});

export default rootReducer;
