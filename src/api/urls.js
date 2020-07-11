// export const SERVER_URL = 'https://teachmeproject.herokuapp.com';

// export const trendingSkillsUrl = `${SERVER_URL}/getTrendingTechnologies`;

// export const postSkillUrl = `${SERVER_URL}/addCourseDetails`;

export const ROOT_URL = 'https://teachmeproject.herokuapp.com';
const withKey = url => `${ROOT_URL}${url}`;

// Account
export const NEW_SESSION = withKey('/authentication/session/new');
export const NEW_GUEST_SESSION = withKey('/authentication/guest_session/new');
export const NEW_REQUEST_TOKEN = withKey('/authentication/token/new');
export const VALIDATE_TOKEN_WITH_LOGIN = withKey('/authorizeUserDetails');
export const VALIDATE_USER_WITH_OTP = withKey('/registerUserDetails');
export const ACCOUNT_DETAILS = withKey('/account');
export const AUTHENTICATE_NEW_USER = withKey('/validateNewUser');
export const RESET_PASSWORD_URL = withKey('/forgotPassword');
export const UPDATE_PROFILE_WITH_ID_URL = withKey('/updateUserDetailsWithId');

// Home
export const trendingSkillsUrl = withKey('/getTrendingTechnologies');

// Post
export const postSkillUrl = withKey('/addCourseDetails');