import { combineReducers } from 'redux';
import AuthReducer from './AuthReducers';
import SkillReducer from './SkillReducer';

export default combineReducers({
  auth: AuthReducer,
  skill: SkillReducer,
});
