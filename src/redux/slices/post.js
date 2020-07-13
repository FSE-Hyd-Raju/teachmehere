import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { postSkillUrl } from '../urls';

export const initialState = {
  isPostQueryActive: false,
  hasErrors: false,
  postResponse: '',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postSkill: state => {
      state.isPostQueryActive = true;
    },
    postSkillSuccess: state => {
      state.postResponse = 'successfull';
      state.isPostQueryActive = false;
      state.hasErrors = false;
    },
    postSkillFailure: state => {
      state.isPostQueryActive = false;
      state.hasErrors = true;
    },
  },
});

export const {
  postSkill,
  postSkillSuccess,
  postSkillFailure,
} = postSlice.actions;
export const postSelector = state => state.post;
export default postSlice.reducer;

export function postNewSkill(data) {
  return async dispatch => {
    dispatch(postSkill());

    try {
      const response = await axios.post(postSkillUrl, data);
      if (response) {
        dispatch(postSkillSuccess());
      }
    } catch (error) {
      dispatch(postSkillFailure());
    }
  };
}
