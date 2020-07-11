import store from '../redux/store';

export const getCurrentUser = () => store.getState().auth.user || {};
export const getCurrentUsersAccountId = () => getCurrentUser().accountId;
export const getCurrentUsersSessionId = () => getCurrentUser().sessionId;
