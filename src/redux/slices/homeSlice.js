import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchInitialDataUrl, fetchSkillsDataUrl } from '../urls';
import { useSelector } from 'react-redux';

export const initialState = {
  loading: false,
  skillsLoading: false,
  homeData: {},
  homeSkillsData: {},
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    fetchInitialData: state => {
      state.loading = true;
    },
    fetchInitialDataSuccuess: (state, { payload }) => {
      state.loading = false;
      state.homeData = payload;
    },
    fetchInitialDataFailure: state => {
      state.loading = false;
      state.homeData = {};
    },
    fetchSkillsData: state => {
      state.skillsLoading = true;
    },
    fetchSkillsDataSuccuess: (state, { payload }) => {
      state.skillsLoading = false;
      state.homeSkillsData = payload;
    },
    fetchSkillsDataFailure: state => {
      state.skillsLoading = false;
      state.homeSkillsData = {};
    },
  },
});

export const {
  fetchInitialData,
  fetchInitialDataSuccuess,
  fetchInitialDataFailure,
  fetchSkillsData,
  fetchSkillsDataSuccuess,
  fetchSkillsDataFailure,
} = homeSlice.actions;

export const homeSelector = state => state.home;
export default homeSlice.reducer;

export function fetchInitialDataWhenAppLoading() {
  return async (dispatch, getState) => {
    const loading = getState().home.loading;
    if (loading) {
      return;
    }
    console.log('tag in');
    dispatch(fetchInitialData());
    try {
      const response = await axios.get(fetchInitialDataUrl);
      if (response) {
        dispatch(fetchInitialDataSuccuess(response.data));
      }
    } catch (error) {
      console.log('fail');
      dispatch(fetchInitialDataFailure());
    }
  };
}

export function fetchPostedSkills() {
  return async (dispatch, getState) => {
    const skillsLoading = getState().home.skillsLoading;
    if (skillsLoading) {
      return;
    }
    console.log('tag in');
    dispatch(fetchSkillsData());
    try {
      const response = await axios.get(fetchSkillsDataUrl);
      if (response) {
        dispatch(fetchSkillsDataSuccuess(response.data));
      }
    } catch (error) {
      console.log('fail');
      dispatch(fetchSkillsDataFailure());
    }
  };
}
