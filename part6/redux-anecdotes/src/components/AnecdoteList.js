import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, resetNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
    const anecdotes = useSelector((state) => {
        const filteredAnecdotes = state.anecdotes.filter((anecdote, idx, arr) => {
            return anecdote.content.includes(state.filter);
        })
        return filteredAnecdotes;
    });
    const dispatch = useDispatch();

    const handleVote = (anecdote) => {
        dispatch(voteForAnecdote(anecdote));
        dispatch(setNotification('You voted "' + anecdote.content + '"'));
        setTimeout(() => {
            dispatch(resetNotification());
        }, 5000);

    }

    return anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
        </div>
    ));
};

export default AnecdoteList;
