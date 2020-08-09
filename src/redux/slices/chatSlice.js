import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { chatUrl } from '../urls';
import { storeAsyncData, getAsyncData, clearAsyncData } from '../../components/common/asyncStorage';
import firestore from '@react-native-firebase/firestore';


export const initialState = {
    chatResults: [],
    searchChatResults: [],
    loading: false,
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
        },
        clearData: (state) => {
            state.loading = false;
            state.chatResults = [];
            state.searchChatResults = [];
        },
        enableLoading: (state) => {
            state.loading = true;
        },
        disableLoading: (state) => {
            state.loading = false;
        }

    },
});

export const {
    getChats,
    getChatsSuccess,
    getChatsFailure,
    setChatResults,
    clearData,
    enableLoading,
    disableLoading
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
                // .where("deletedids", "array-contains", userInfo._id)
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


export function checkChatExists() {
    return async dispatch => {
        alert(JSON.stringify("khkh"))
        // dispatch(enableLoading());
        // try {
        //     firestore().collection('THREADS').
        //         where("ids", "array-contains", props.userInfo._id).
        //         get().then(querySnapshot => {
        //             querySnapshot.forEach(documentSnapshot => {
        //                 data = documentSnapshot.data();
        //                 if (data["ids"].indexOf(props.item._id) > -1) {
        //                     exists = true;

        //                     item = {
        //                         ...props.item,
        //                         _id: documentSnapshot.id,
        //                         name: props.item.username
        //                     }
        //                 }
        //             })
        //             alert(exists)
        //             dispatch(disableLoading());
        //             if (!exists) {
        //                 props.sendMessage()
        //             } else {
        //                 props.navigatefun()
        //             }
        //         });

        // } catch (error) {
        //     dispatch(disableLoading());
        // }
    };
}