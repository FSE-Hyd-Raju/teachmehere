import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { searchUrl, topCategoriesUrl } from '../urls';
import { storeAsyncData, getAsyncData, clearAsyncData } from '../../components/common/asyncStorage';


export const initialState = {
    searchResults: [],
    loading: false,
    hasErrors: false,
    searchQuery: "",
    recentlySearchedText: [],
    recentlyViewedCourses: [],
    topCategories: [],
    filterObj: {},
    isRefreshing: false
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, { payload }) => {
            state.searchQuery = payload
        },
        setFilterObj: (state, { payload }) => {
            state.filterObj = payload
        },
        setIsRefreshing: (state, { payload }) => {
            state.isRefreshing = payload
        },
        getTopCategories: state => {
            state.topCategories = []
        },
        getTopCategoriesSuccess: (state, { payload }) => {
            state.topCategories = payload
        },
        getSearchResults: state => {
            state.loading = true;
            state.searchResults = []
        },
        getSearchResultsSuccess: (state, { payload }) => {
            state.searchResults = payload;
            state.loading = false;
            state.hasErrors = false;
            state.isRefreshing = false;
        },
        getSearchResultsFailure: state => {
            state.loading = false;
            state.hasErrors = true;
            state.searchResults = [];
            state.isRefreshing = false;
        },
        clearSearchResults: state => {
            state.searchResults = []
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
    setSearchQuery,
    setFilterObj,
    setIsRefreshing,
    getTopCategories,
    getTopCategoriesSuccess,
    getSearchResults,
    getSearchResultsSuccess,
    getSearchResultsFailure,
    clearSearchResults,
    setRecentlySearchedText,
    setRecentlyViewedCourses
} = searchSlice.actions;

export const searchSelector = state => state.search;
export default searchSlice.reducer;

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

export function fetchSearchResults(data) {
    return async (dispatch, getState) => {
        if (!data.page)
            dispatch(getSearchResults());
        else
            dispatch(setIsRefreshing(true));
        try {
            const response = await axios.post(searchUrl, data);
            if (data.page) {
                availableData = [...getState().search.searchResults];
                response.data = availableData.concat(response.data)
            }
            if (response.data.length || !data.page)
                dispatch(getSearchResultsSuccess(response.data));
        } catch (error) {
            dispatch(getSearchResultsFailure());
        }
    };
}

export function getRecentSearches() {
    return async dispatch => {
        try {
            const recentlySearchedTextResponse = await getAsyncData("recentlySearchedText")
            const recentlyViewedCoursesResponse = await getAsyncData("recentlyViewedCourses")

            dispatch(setRecentlySearchedText(recentlySearchedTextResponse))
            dispatch(setRecentlyViewedCourses(recentlyViewedCoursesResponse))
        } catch (error) {
            // dispatch(getSearchResultsFailure(error));
        }
    };
}

export function updateRecentSearches(item, recentlySearchedText, recentlyViewedCourses) {
    return async dispatch => {
        try {
            if (!recentlySearchedText.includes(item.search)) {
                (recentlySearchedText.length > 5) ? recentlySearchedText.pop() : recentlySearchedText.unshift(item.search)
            }
            if (!(recentlyViewedCourses.filter(e => e._id === item.course._id).length)) {
                recentlyViewedCourses.length > 4 ? recentlyViewedCourses.pop() : recentlyViewedCourses.unshift(item.course)
            }

            dispatch(setRecentlySearchedText(recentlySearchedText))
            dispatch(setRecentlyViewedCourses(recentlyViewedCourses))

            storeAsyncData("recentlySearchedText", recentlySearchedText)
            storeAsyncData("recentlyViewedCourses", recentlyViewedCourses)

        } catch (error) {
            // dispatch(getSearchResultsFailure(error));
        }
    };
}

export function removeRecentlySearchedText(searchItem, recentlySearchedText) {
    return async dispatch => {
        try {
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

export function removeRecentlyViewedCourses(course, recentlyViewedCourses) {
    return async dispatch => {
        try {
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

