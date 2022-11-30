import { createSlice } from '@reduxjs/toolkit'

const initialState = '';

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        displayNotification(state, action) {
            const newNotification = action.payload;
            return newNotification;
        },
        resetNotification(state, action) {
            return null;
        }

    },
})

export const {displayNotification, resetNotification} = notificationSlice.actions;

export const setNotification = (text, duration) => {  
    return async dispatch => {
        dispatch(displayNotification(text));
        setTimeout(() => {
            dispatch(resetNotification());
        }, duration);
    }}

export default notificationSlice.reducer;
