import { createSlice } from '@reduxjs/toolkit'

const initialState = '';

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            const newNotification = action.payload;
            return newNotification;
        }
    },
})

export const {createNotification} = notificationSlice.actions;
export default notificationSlice.reducer;
