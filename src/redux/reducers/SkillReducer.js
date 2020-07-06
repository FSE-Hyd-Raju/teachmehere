import { Post } from '../actions/types';

const INITIAL_STATE = {
  skill: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Post.POST_SKILL:
      return {
        ...state,
        skill: action.skill,
      };
    case Post.POST_SKILL_SUCCESS:
      return {
        ...state,
        skill: action.skill,
      };
    case Post.POST_SKILL_FAILED:
      return {
        ...state,
        skill: action.skill,
      };
    default:
      return { ...state };
  }
};
