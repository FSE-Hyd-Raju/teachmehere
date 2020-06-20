export const REGISTRATION_URL = 'https://www.themoviedb.org/account/signup';
// export const RESET_PASSWORD_URL = 'https://www.themoviedb.org/account/reset-password';

export const API_KEY = '16920a1e34e3b08e3a720c33cfc1341c';
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
// Images
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
export const getW45ImageUrl = imagePath => `${BASE_IMAGE_URL}w45${imagePath}`;
export const getW92ImageUrl = imagePath => `${BASE_IMAGE_URL}w92${imagePath}`;
export const getW185ImageUrl = imagePath => `${BASE_IMAGE_URL}w185${imagePath}`;
export const getW300ImageUrl = imagePath => `${BASE_IMAGE_URL}w300${imagePath}`;
export const getW500ImageUrl = imagePath => `${BASE_IMAGE_URL}w500${imagePath}`;
export const getW780ImageUrl = imagePath => `${BASE_IMAGE_URL}w780${imagePath}`;
export const getW1280ImageUrl = imagePath => `${BASE_IMAGE_URL}w1280${imagePath}`;

// Skill Details
export const getDetailsSkillUrl = ({ skillId }) => withKey(`/skill/${skillId}`);
export const getSkillAccountStateUrl = ({ skillId, sessionId }) =>
  `${withKey(`/skill/${skillId}/account_states`)}&session_id=${sessionId}`;
export const getSkillRecommendationsUrl = ({ skillId, page = 1 }) =>
  `${withKey(`/skill/${skillId}/recommendations`)}&page=${page}`;

// Skills Sections
export const getPopularSkillsUrl = ({ page = 1 }) => `${withKey('/skill/popular')}&page=${page}`;
export const getTopRatedSkillsUrl = ({ page = 1 }) => `${withKey('/skill/top_rated')}&page=${page}`;
export const getTrendingDailySkillsUrl = ({ page = 1 }) =>
  `${withKey('/trending/skill/day')}&page=${page}`;
export const getTrendingWeeklySkillsUrl = ({ page = 1 }) =>
  `${withKey('/trending/skill/week')}&page=${page}`;

// Skills Account State
export const getFavoriteSkillUrl = ({ accountId, sessionId, page = 1 }) =>
  `${withKey(`/account/${accountId}/favorite/skills`)}&session_id=${sessionId}&page=${page}`;
export const getWatchlistUrl = ({ accountId, sessionId, page = 1 }) =>
  `${withKey(`/account/${accountId}/watchlist/skills`)}&session_id=${sessionId}&page=${page}`;
export const getAddToFavoriteUrl = ({ accountId, sessionId }) =>
  `${withKey(`/account/${accountId}/favorite`)}&session_id=${sessionId}`;
export const getAddToWatchlistUrl = ({ accountId, sessionId }) =>
  `${withKey(`/account/${accountId}/watchlist`)}&session_id=${sessionId}`;

// Skills Search
export const getSearchSkillsUrl = ({ page = 1, query }) =>
  `${withKey('/search/skill')}&page=${page}&query=${query}`;

// Imdb
export const getImdbLink = imdbID => `https://www.imdb.com/title/${imdbID}`;
