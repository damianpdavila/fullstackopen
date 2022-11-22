import { createSlice } from '@reduxjs/toolkit'

const initialState = '';

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            const newFilter = action.payload;
            return newFilter;
        },
        resetFilter(state, action) {
            return null;
        }

    },
})

export const {setFilter, resetFilter} = filterSlice.actions;
export default filterSlice.reducer;
