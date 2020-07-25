import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { chatUrl } from '../urls';
import { storeAsyncData, getAsyncData, clearAsyncData } from '../../components/common/asyncStorage';


export const initialState = {

};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {

    },
});

export const {

} = chatSlice.actions;

export const chatSelector = state => state.search;
export default chatSlice.reducer;

export function fetchTopCategories() {
    return async dispatch => {
        dispatch(getTopCategories());
        try {
            const response = await axios.get("https://teachmeproject.herokuapp.com/getTopCategories");
            if (response) {
                dispatch(getTopCategoriesSuccess(response.data));
            }
        } catch (error) {
            dispatch(getTopCategories());
        }
    };
}
