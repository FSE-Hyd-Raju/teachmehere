import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchInitialDataUrl } from '../urls';
import { useSelector } from 'react-redux';

export const initialState = {
  loading: false,
  categories: [],
  featuredSkills: [],
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
      state.categories = payload && payload.categories;
      state.featuredSkills = payload && payload.featuredSkills;
    },
    fetchInitialDataFailure: state => {
      state.loading = false;
      state.categories = [];
      state.featuredSkills = [];
    },
  },
});

export const {
  fetchInitialData,
  fetchInitialDataSuccuess,
  fetchInitialDataFailure,
} = homeSlice.actions;

export const homeSelector = state => state.home;
export default homeSlice.reducer;

export function fetchInitialDataWhenAppLoading() {
  return async dispatch => {
    dispatch(fetchInitialData(true));
    try {
      const response = await axios.get(fetchInitialDataUrl);
      if (response) {
        dispatch(fetchInitialDataSuccuess(response.data));
      }
    } catch (error) {
      dispatch(fetchInitialDataFailure());
    }
  };
}
