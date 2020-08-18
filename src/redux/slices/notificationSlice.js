import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    notificationsList: []
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationsList: (state, { payload }) => {
            state.notificationsList = payload;
        }
    },
});

export const {
    setNotificationsList
} = notificationSlice.actions;

export const notificationSelector = state => state.notification;
export default notificationSlice.reducer;

