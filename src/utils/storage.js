import { AsyncStorage } from 'react-native';
import { getCurrentUsersAccountId } from '../utils/store';

// User
const stUserKey = 'user';
export const stGetUser = () =>
  getJsonObjectFromStorage(stUserKey, { onJsonParseError: stRemoveUser });
export const stSaveUser = user => AsyncStorage.setItem(stUserKey, JSON.stringify(user));
export const stRemoveUser = () => AsyncStorage.removeItem(stUserKey);

// Current skills
const stCurrentSkillsKey = 'currentSkills';
export const stGetCurrentSkills = () => getJsonObjectFromStorage(stCurrentSkillsKey);
export const stSaveCurrentSkills = skills =>
  AsyncStorage.setItem(stCurrentSkillsKey, JSON.stringify(skills));
export const stRemoveCurrentSkills = () => AsyncStorage.removeItem(stCurrentSkillsKey);

// Requests
const stRequestsKey = 'requests';
export const stGetRequests = () => getJsonObjectFromStorage(stRequestsKey);
export const stSaveRequests = requests =>
  AsyncStorage.setItem(stRequestsKey, JSON.stringify(requests));

// Explore skills
const getExploredSkillsKey = () => `user:${getCurrentUsersAccountId()}:explored`;
export const stGetExploredSkills = () => getJsonObjectFromStorage(getExploredSkillsKey());
export const stSaveExploredSkills = skills =>
  AsyncStorage.setItem(getExploredSkillsKey(), JSON.stringify(skills));

// Local functions
const getJsonObjectFromStorage = (key, params = {}) =>
  new Promise(async resolve => {
    const { onJsonParseError } = params;

    try {
      const dataJson = await AsyncStorage.getItem(key);
      if (!dataJson) resolve(null);

      const data = JSON.parse(dataJson);
      resolve(data);
    } catch (e) {
      onJsonParseError && onJsonParseError();
      resolve(null);
    }
  });
