import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    isloading: false,
    reqFavPostedCount: { coursedetailscount: 0, requestedcoursescount: 0, myfavoritescount: 0 },
    postedSkills: [],
    requestedSkills: [],
    wishlistSkills: [],
    userRatings: []
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReqFavPostedCount: (state, { payload }) => {
            state.reqFavPostedCount = payload;
        },
        setPostedSkills: (state, { payload }) => {
            state.postedSkills = payload;
        },
        setRequestedSkills: (state, { payload }) => {
            state.requestedSkills = payload;
        },
        setUserRating: (state, { payload }) => {
            state.userRatings = payload;
        },
        setWishlistSkills: (state, { payload }) => {
            state.requestedSkills = payload;
        },
    }
});

export const {
    setReqFavPostedCount,
    setPostedSkills,
    setRequestedSkills,
    setWishlistSkills,
    setUserRating
} = profileSlice.actions;

export const profileSelector = state => state.profile;

export default profileSlice.reducer;

