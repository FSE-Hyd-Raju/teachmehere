import { combineReducers } from 'redux';

import postReducer from './post';
import searchReducer from './search';
import loginReducer from './loginSlice';

const rootReducer = combineReducers({
  post: postReducer,
  search: searchReducer,
  login: loginReducer
});

export default rootReducer;
