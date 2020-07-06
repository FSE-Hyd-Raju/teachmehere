import { Post } from './types';

export const postSkill = skill => ({
  type: Post.POST_SKILL,
  payload: skill,
});

export const postSkillSuccess = skill => ({
  type: Post.POST_SKILL_SUCCESS,
  payload: skill,
});

export const postSkillFailed = skill => ({
  type: Post.POST_SKILL_FAILED,
  payload: skill,
});
