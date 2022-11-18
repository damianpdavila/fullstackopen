import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
    const dispatch = useDispatch();

    const addHandler = (evt) => {
        evt.preventDefault();
        const content = evt.target.content.value;
        evt.target.content.value = '';
        console.log('new', content);
        dispatch(createAnecdote(content));
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
