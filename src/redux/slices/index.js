import { combineReducers } from 'redux';

import postReducer from './post';
import searchReducer from './search';
import loginReducer from './loginSlice';
import signupReducer from './signupSlice';
import forgotPasswordReducer from './forgotPasswordSlice';

const rootReducer = combineReducers({
  post: postReducer,
  search: searchReducer,
  login: loginReducer,
  signup: signupReducer,
  forgotPassword: forgotPasswordReducer
});

export default rootReducer;
