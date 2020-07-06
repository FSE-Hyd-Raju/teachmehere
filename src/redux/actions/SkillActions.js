import { Skill } from './types';

export const getSkills = skill => ({
  type: Skill.GET_SKILLS,
  payload: skill,
});

export const postSkill = skill => ({
  type: Skill.POST_SKILL,
  payload: skill,
});

export const postSkillSuccess = skill => ({
  type: Skill.POST_SKILL_SUCCESS,
  payload: skill,
});

export const postSkillFailed = skill => ({
  type: Skill.POST_SKILL_FAILED,
  payload: skill,
});
