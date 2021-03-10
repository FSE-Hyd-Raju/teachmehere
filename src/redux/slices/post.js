import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { postSkillUrl } from '../urls';

export const initialState = {
  isPostQueryActive: false,
  hasErrors: false,
  postResponse: '',
  loading: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postLoading: state => {
      state.loading = true;
    },
    postSkill: state => {
      state.isPostQueryActive = true;
    },
    postSkillSuccess: state => {
      state.postResponse = 'successfull';
      state.isPostQueryActive = false;
      state.hasErrors = false;
      state.loading = false;
    },
    postSkillFailure: state => {
      state.postResponse = 'failed';
      state.isPostQueryActive = false;
      state.hasErrors = true;
      state.loading = false;
    },
  },
});

export const {
  postLoading,
  postSkill,
  postSkillSuccess,
  postSkillFailure,
} = postSlice.actions;
export const postSelector = state => state.post;
export default postSlice.reducer;

export function postNewSkill(param) {
  return async dispatch => {
    try {
      const response = await axios.post(postSkillUrl, param.postData);
      if (response) {
        dispatch(postSkillSuccess());
        param.onSuccess();
      }
    } catch (error) {
      dispatch(postSkillFailure());
    }
  };
}
