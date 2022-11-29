import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        anecdoteVoted(state, action) {
            // const anecdoteToVote = state.find(
            //     (anec) => anec.id === action.payload.id
            // );
            // console.log('found anec to vote on: ', anecdoteToVote);
            // const votedAnecdote = {
            //     ...anecdoteToVote,
            //     votes: anecdoteToVote.votes + 1,
            // };
            let updatedState = state.map((anec) =>
                anec.id === action.payload.id ? action.payload : anec
            );
            return updatedState.sort((a, b) => b.votes - a.votes)
        },
        appendAnecdote(state, action) {
            return state.concat(action.payload);
        },
        setAnecdotes(state, action) {
            const newAnecdotes = action.payload;
            return newAnecdotes;
        }

    },
})

export const {anecdoteVoted, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {  
    return async dispatch => {    
        const anecdotes = await anecdoteService.getAll();
        const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
        dispatch(setAnecdotes(sortedAnecdotes));
    }}

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content);
        dispatch(appendAnecdote(newAnecdote));
    }}

export const voteForAnecdote = (anecdote) => {
    return async dispatch => {
        let votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
        const updatedAnecdote = await anecdoteService.update(votedAnecdote);
        dispatch(anecdoteVoted(updatedAnecdote));
    }}
    
export default anecdoteSlice.reducer;
