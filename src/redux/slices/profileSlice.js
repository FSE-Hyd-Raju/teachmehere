import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    isloading: false,
    reqFavPostedCount: { coursedetailscount: 0, requestedcoursescount: 0, myfavoritescount: 0 }
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReqFavPostedCount: (state, { payload }) => {
            alert(payload)
            state.reqFavPostedCount = payload;
        }
    }
});

export const {
    setReqFavPostedCount
} = profileSlice.actions;

export const profileSelector = state => state.profile;

export default profileSlice.reducer;

