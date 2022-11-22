import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, resetNotification} from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
    const dispatch = useDispatch();

    const addHandler = (evt) => {
        evt.preventDefault();
        const content = evt.target.content.value;
        if (!content) {
            return;
        }
        evt.target.content.value = '';
        console.log('new', content);
        dispatch(createAnecdote(content));
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
