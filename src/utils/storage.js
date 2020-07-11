import { AsyncStorage } from 'react-native';
import { getCurrentUsersAccountId } from '../utils/store';

// User
const stUserKey = 'user';
export const stGetUser = () =>
  getJsonObjectFromStorage(stUserKey, { onJsonParseError: stRemoveUser });
export const stSaveUser = user => AsyncStorage.setItem(stUserKey, JSON.stringify(user));
export const stRemoveUser = () => AsyncStorage.removeItem(stUserKey);
