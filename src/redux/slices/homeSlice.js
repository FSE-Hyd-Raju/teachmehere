import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchInitialDataUrl } from '../urls';
import { useSelector } from 'react-redux';

export const initialState = {
  loading: false,
  homeData: [],
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
      state.homeData = [];
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
    dispatch(fetchInitialData());
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
