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
      state.postResponse = 'failed';
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

export function postNewSkill(data, onSuccess) {
  return async dispatch => {
    try {
      const response = await axios.post(postSkillUrl, data);
      if (response) {
        console.log("ressssss====---->", response)
        dispatch(postSkillSuccess());
        onSuccess();
      }
    } catch (error) {
      dispatch(postSkillFailure());
    }
  };
}
