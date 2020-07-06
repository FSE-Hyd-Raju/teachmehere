import { Skill } from '../actions/types';

const INITIAL_STATE = {
  skill: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Skill.GET_SKILLS:
      return {
        ...state,
        skill: action.skill,
      };
    default:
      return { ...state };
  }
};
