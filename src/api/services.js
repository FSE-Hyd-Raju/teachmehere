import axios from 'axios';
import {
  postSkillUrl,
} from './urls';
import Config from '../Config';

// ------------------------------------------------------
// Post skill details
// ------------------------------------------------------
export const postSkill = skill =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(postSkillUrl, skill);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });