import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { chatUrl } from '../urls';
import { storeAsyncData, getAsyncData, clearAsyncData } from '../../components/common/asyncStorage';
import firestore from '@react-native-firebase/firestore';


export const initialState = {
    chatResults: [],
    loading: false,
    hasErrors: false
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // getChats: state => {
        //     state.loading = true;
        //     state.chatResults = [];
        // },
        // getChatsSuccess: (state, { payload }) => {
        //     state.chatResults = payload;
        //     state.loading = false;
        //     state.hasErrors = false;
        // },
        // getChatsFailure: state => {
        //     state.loading = false;
        //     state.hasErrors = true;
        //     state.chatResults = [];
        // }
    },
});

export const {
    // getChats,
    // getChatsSuccess,
    // getChatsFailure,
} = chatSlice.actions;

export const chatSelector = state => state.chat;
export default chatSlice.reducer;

// export function fetchChats() {
//     return async dispatch => {
//         dispatch(getChats(userInfo));
//         try {
//             firestore()
//                 .collection('THREADS')
//                 .where("ids", "array-contains", userInfo._id)
//                 .orderBy('latestMessage.createdAt', 'desc')
//                 .onSnapshot(querySnapshot => {
//                     var res = []
//                     if (querySnapshot) {
//                         res = querySnapshot.docs.map(documentSnapshot => {
//                             senderDetails = documentSnapshot.data().userDetails.find(o => o.id != userInfo._id);
//                             return {
//                                 _id: documentSnapshot.id,
//                                 name: (senderDetails && senderDetails.name) ? senderDetails.name : "",
//                                 latestMessage: {
//                                     text: ''
//                                 },
//                                 ...documentSnapshot.data()
//                             };
//                         });
//                     }
//                     dispatch(getChatsSuccess(res));
//                 });
//         } catch (error) {
//             dispatch(getChatsFailure());
//         }
//     };
// }
