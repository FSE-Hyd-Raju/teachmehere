import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { chatUrl } from '../urls';
import { storeAsyncData, getAsyncData, clearAsyncData } from '../../components/common/asyncStorage';
import firestore from '@react-native-firebase/firestore';


export const initialState = {
    chatResults: [],
    searchChatResults: [],
    loading: true,
    hasErrors: false
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        getChats: state => {
            state.loading = true;
            state.chatResults = [];
            state.searchChatResults = [];
        },
        getChatsSuccess: (state, { payload }) => {
            state.chatResults = payload;
            state.searchChatResults = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getChatsFailure: state => {
            state.loading = false;
            state.hasErrors = true;
            state.chatResults = [];
            state.searchChatResults = [];
        },
        setChatResults: (state, { payload }) => {
            state.searchChatResults = payload;
        }
    },
});

export const {
    getChats,
    getChatsSuccess,
    getChatsFailure,
    setChatResults
} = chatSlice.actions;

export const chatSelector = state => state.chat;
export default chatSlice.reducer;

export function fetchChats(userInfo) {
    return async dispatch => {
        dispatch(getChats());
        try {
            firestore()
                .collection('THREADS')
                .where("ids", "array-contains", userInfo._id)
                .orderBy('latestMessage.createdAt', 'desc')
                .onSnapshot(querySnapshot => {
                    var res = []
                    if (querySnapshot) {
                        res = querySnapshot.docs.map(documentSnapshot => {
                            senderDetails = documentSnapshot.data().userDetails.find(o => o.id != userInfo._id);
                            return {
                                _id: documentSnapshot.id,
                                name: (senderDetails && senderDetails.name) ? senderDetails.name : "",
                                latestMessage: {
                                    text: ''
                                },
                                ...documentSnapshot.data()
                            };
                        });
                    }
                    dispatch(getChatsSuccess(res));
                });
        } catch (error) {
            dispatch(getChatsFailure());
        }
    };
}
