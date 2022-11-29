import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        voteForAnecdote(state, action) {
            const anecdoteToVote = state.find(
                (anec) => anec.id === action.payload
            );
            console.log('found anec to vote on: ', anecdoteToVote);
            const votedAnecdote = {
                ...anecdoteToVote,
                votes: anecdoteToVote.votes + 1,
            };
            let updatedState = state.map((anec) =>
                anec.id === votedAnecdote.id ? votedAnecdote : anec
            );
            return updatedState.sort((a, b) => b.votes - a.votes)
        },
        createAnecdote(state, action) {
            return state.concat(action.payload);
        },
        setAnecdotes(state, action) {
            const newAnecdotes = action.payload;
            return newAnecdotes;
        }

    },
})

export const {createAnecdote, voteForAnecdote, setAnecdotes} = anecdoteSlice.actions;

export const initializeAnecdotes = () => {  
    return async dispatch => {    
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }}

export default anecdoteSlice.reducer;
