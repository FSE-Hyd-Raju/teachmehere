import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { chatUrl } from '../urls';
import { storeAsyncData, getAsyncData, clearAsyncData } from '../../components/common/asyncStorage';
import firestore from '@react-native-firebase/firestore';


export const initialState = {
    chatResults: [],
    searchChatResults: [],
    loading: false,
    hasErrors: false,
    newChatList: []
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
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        setNewChatList: (state, { payload }) => {
            state.newChatList = payload
        }


    },
});

export const {
    getChats,
    getChatsSuccess,
    getChatsFailure,
    setChatResults,
    clearData,
    setLoading,
    setNewChatList
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
                        for (var i in querySnapshot.docs) {
                            const documentSnapshot = querySnapshot.docs[i]
                            // res = querySnapshot.docs.map(documentSnapshot => {
                            data = documentSnapshot.data();
                            senderDetails = data.userDetails.find(o => o.id != userInfo._id);
                            if ((data.deletedIds && !data.deletedIds.length) || (data.deletedIds && data.deletedIds.indexOf(userInfo._id) == -1)) {
                                res.push({
                                    _id: documentSnapshot.id,
                                    name: (senderDetails && senderDetails.name) ? senderDetails.name : "",
                                    displaypic: (senderDetails && senderDetails.displaypic) ? senderDetails.displaypic : "",
                                    latestMessage: {
                                        text: ''
                                    },
                                    ...data
                                })
                            }

                            // });
                        }
                    }
                    console.log("res0")
                    // console.log(JSON.stringify(res))
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