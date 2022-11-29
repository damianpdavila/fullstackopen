import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, resetNotification} from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch();

    const addHandler = async (evt) => {
        evt.preventDefault();
        const content = evt.target.content.value;
        if (!content) {
            return;
        }
        evt.target.content.value = '';
        console.log('new', content);
        const newAnecdote = await anecdoteService.createNew(content);
        dispatch(createAnecdote(newAnecdote));
        dispatch(setNotification('New anecdote added'));
        setTimeout(() => {
            dispatch(resetNotification());
        }, 5000);
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addHandler}>
                <input name="content" />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
