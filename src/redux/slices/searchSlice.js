import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { searchUrl } from '../urls';
import { storeAsyncData, getAsyncData, clearAsyncData } from '../../components/common/asyncStorage';


export const initialState = {
    searchResults: [],
    loading: false,
    hasErrors: false,
    recentlySearchedText: [],
    recentlyViewedCourses: []
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        getSearchResults: state => {
            state.loading = true;
            state.searchResults = []
        },
        getSearchResultsSuccess: (state, { payload }) => {
            state.searchResults = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getSearchResultsFailure: (state, { payload }) => {
            state.loading = false;
            state.hasErrors = payload;
            state.searchResults = [];
        },
        setRecentlySearchedText: (state, { payload }) => {
            state.recentlySearchedText = payload;
        },
        setRecentlyViewedCourses: (state, { payload }) => {
            state.recentlyViewedCourses = payload;
        }
    },
});

export const {
    getSearchResults,
    getSearchResultsSuccess,
    getSearchResultsFailure,
    setRecentlySearchedText,
    setRecentlyViewedCourses
} = searchSlice.actions;

export const searchSelector = state => state.search;
export default searchSlice.reducer;

export function fetchSearchResults(data) {
    return async dispatch => {
        dispatch(getSearchResults());
        try {
            const response = await axios.post(searchUrl, data);
            if (response) {
                dispatch(getSearchResultsSuccess(response.data));
            }
        } catch (error) {
            dispatch(getSearchResultsFailure(error));
        }
    };
}

export function getRecentSearches() {
    return async dispatch => {
        try {
            const recentlySearchedTextResponse = await getAsyncData("recentlySearchedText")
            const recentlyViewedCoursesResponse = await getAsyncData("recentlyViewedCourses")

            if (response) {
                console.log(JSON.stringify(data))
                dispatch(setRecentlySearchedText(recentlySearchedTextResponse))
                dispatch(setRecentlyViewedCourses(recentlyViewedCoursesResponse))
            }
        } catch (error) {
            // dispatch(getSearchResultsFailure(error));
        }
    };
}

export function updateRecentSearches(item) {
    return async (dispatch, getState) => {
        try {
            let { recentlySearchedText, recentlyViewedCourses } = getState()
            if (!recentlySearchedText.includes(item.search)) {
                (recentlySearchedText.length > 5) ? recentlySearchedText.pop() : recentlySearchedText.unshift(item.search)
            }
            if (!(recentlyViewedCourses.filter(e => e._id === item.course._id).length)) {
                recentlyViewedCourses.length > 4 ? recentlyViewedCourses.pop() : recentlyViewedCourses.unshift(item.course)
            }

            storeAsyncData("recentlySearchedText", recentlySearchedText)
            storeAsyncData("recentlyViewedCourses", recentlyViewedCourses)

            dispatch(setRecentlySearchedText(recentlySearchedText))
            dispatch(setRecentlyViewedCourses(recentlyViewedCourses))
        } catch (error) {
            // dispatch(getSearchResultsFailure(error));
        }
    };
}

export function removeRecentlySearchedText(searchItem) {
    return async (dispatch, getState) => {
        try {
            let { recentlySearchedText } = getState()
            recentlySearchedText = recentlySearchedText.filter((ele) => {
                return ele != searchItem
            })
            storeAsyncData("recentlySearchedText", recentlySearchedText)
            dispatch(setRecentlySearchedText(recentlySearchedText))
        } catch (error) {
            // dispatch(getSearchResultsFailure(error));
        }
    };
}

export function removeRecentlyViewedCourses(course) {
    return async (dispatch, getState) => {
        try {
            let { recentlyViewedCourses } = getState()

            recentlyViewedCourses = recentlyViewedCourses.filter((ele) => {
                return ele._id != course._id;
            })
            storeAsyncData("recentlyViewedCourses", recentlyViewedCourses)
            dispatch(setRecentlyViewedCourses(recentlyViewedCourses))
        } catch (error) {
            // dispatch(getSearchResultsFailure(error));
        }
    };
}
