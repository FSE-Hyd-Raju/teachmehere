import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { chatUrl } from '../urls';
import {
  storeAsyncData,
  getAsyncData,
  clearAsyncData,
} from '../../components/common/asyncStorage';
import firestore from '@react-native-firebase/firestore';

export const initialState = {
  featuredSkills: [],
  allCategories: [],
  topCategories: [],
  recomendedSkills: [],
  loading: false,
  hasErrors: false,
};

const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {},
});

export const skillSelector = state => state.chat;
export default skillSlice.reducer;
