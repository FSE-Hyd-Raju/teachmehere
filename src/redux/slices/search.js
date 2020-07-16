import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { searchUrl } from '../urls';

export const initialState = {
    searchResults: [],
    loading: false,
    filterObj: {},
    hasErrors: false
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        getSearchResults: state => {
            state.loading = true;
        },
        getSearchResultsSuccess: (state, { payload }) => {
            alert(JSON.stringify(payload))
            state.searchResults = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getSearchResultsFailure: (state, { payload }) => {
            alert(payload)
            state.loading = false;
            state.hasErrors = payload;
        },
    },
});

export const {
    getSearchResults,
    getSearchResultsSuccess,
    getSearchResultsFailure,
} = searchSlice.actions;

export const searchSelector = state => state.search;
export default searchSlice.reducer;

export function fetchSearchResults(data) {
    return async dispatch => {
        dispatch(getSearchResults());
        try {
            // const response = await fetch(
            //     searchUrl,
            //     {
            //         method: 'POST',
            //         headers: {
            //             'Accept': 'application/json',
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(data)
            //     }
            // );
            // const responseJson = await response.json();
            // dispatch(getSearchResultsSuccess(responseJson));

            const response = await axios.post(searchUrl, data);
            if (response) {
                dispatch(getSearchResultsSuccess(response.data));
            }
        } catch (error) {
            dispatch(getSearchResultsFailure(error));
        }
    };
}
