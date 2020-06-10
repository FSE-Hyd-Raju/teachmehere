import axios from 'axios';
import {
  getCurrentUsersSessionId,
  getCurrentUsersAccountId,
} from '../utils/store';
import {
  getAddToFavoriteUrl,
  getAddToWatchlistUrl,
  getSearchSkillsUrl,
  getFavoriteSkillUrl,
  getWatchlistUrl,
  getSkillAccountStateUrl,
  getDetailsSkillUrl,
  getSkillRecommendationsUrl,
  getPopularSkillsUrl,
} from './urls';
import { parseSkillsArray } from '../utils/skills';
import Config from '../Config';

// ------------------------------------------------------
// Skill details
// ------------------------------------------------------
export const fetchSkillAccountState = ({ skill }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getSkillAccountStateUrl({
      skillId: skill.id,
      sessionId: getCurrentUsersSessionId(),
    });

    try {
      const { data } = await axios.get(url, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchSkillDetailedInfo = ({ skill }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getDetailsSkillUrl({ skillId: skill.id });

    try {
      const { data } = await axios.get(url, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchSkillRecommendations = (
  { skill, page = 1 },
  reqParams = {},
) =>
  new Promise(async (resolve, reject) => {
    const url = getSkillRecommendationsUrl({ skillId: skill.id, page });

    try {
      const { data } = await axios.get(url, reqParams);
      addParsedSkillsToData(data);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

// ------------------------------------------------------
// Skill actions
// ------------------------------------------------------
export const changeSkillFavoriteStatus = (
  { skill, favorite, accountId, sessionId },
  reqParams = {},
) =>
  new Promise(async (resolve, reject) => {
    const postData = { media_type: 'skill', media_id: skill.id, favorite };
    const url = getAddToFavoriteUrl({
      accountId: accountId || getCurrentUsersAccountId(),
      sessionId: sessionId || getCurrentUsersSessionId(),
    });

    try {
      const { data } = await axios.post(url, postData, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const changeSkillWatchlistStatus = (
  { skill, watchlist, accountId, sessionId },
  reqParams = {},
) =>
  new Promise(async (resolve, reject) => {
    const postData = { media_type: 'skill', media_id: skill.id, watchlist };
    const url = getAddToWatchlistUrl({
      accountId: accountId || getCurrentUsersAccountId(),
      sessionId: sessionId || getCurrentUsersSessionId(),
    });

    try {
      const { data } = await axios.post(url, postData, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

// ------------------------------------------------------
// Skills lists
// ------------------------------------------------------
export const getSectionFetchFunctionFromUrlGetter = urlGetter => (
  params,
  reqParams,
) => fetchSectionSkills(urlGetter, params, reqParams);

export const getSearchFetchFunctionFromQuery = query => ({ page }) =>
  fetchSearchSkills({ page, query });

export const fetchSectionSkills = (urlGetter, { page }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = urlGetter({ page });

    try {
      const { data } = await axios.get(url, reqParams);
      addParsedSkillsToData(data);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchSearchSkills = ({ page, query }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getSearchSkillsUrl({ page, query });

    try {
      const { data } = await axios.get(url, reqParams);
      addParsedSkillsToData(data);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchFavoriteSkills = ({ page }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getFavoriteSkillUrl({
      page,
      sessionId: getCurrentUsersSessionId(),
      accountId: getCurrentUsersAccountId(),
    });

    try {
      const { data } = await axios.get(url, reqParams);
      addParsedSkillsToData(data);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchWatchlistSkills = ({ page }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getWatchlistUrl({
      page,
      sessionId: getCurrentUsersSessionId(),
      accountId: getCurrentUsersAccountId(),
    });

    try {
      const { data } = await axios.get(url, reqParams);
      addParsedSkillsToData(data);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

// ------------------------------------------------------
// Explore skills
// ------------------------------------------------------
export const fetchSkillToExplore = isSkillSeen =>
  new Promise(async (resolve, reject) => {
    const skillsToExplore = [];
    const minFillAmount = 35;
    let page = 1;

    try {
      while (skillsToExplore.length < minFillAmount) {
        const { skills } = await fetchSectionSkills(getPopularSkillsUrl, {
          page,
        });
        skills.forEach(skill => {
          if (!isSkillSeen(skill)) {
            skillsToExplore.push(skill);
          }
        });

        page++;
      }
      resolve(skillsToExplore);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

// Local functions
const addParsedSkillsToData = data =>
  (data.skills = parseSkillsArray(data.results));
