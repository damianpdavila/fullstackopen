import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {

    const addHandler = async (evt) => {
        evt.preventDefault();
        const content = evt.target.content.value;
        if (!content) {
            return;
        }
        evt.target.content.value = '';
        console.log('new', content);
        props.createAnecdote(content);
        props.setNotification('New anecdote added', 5000);
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

const mapDispatchToProps = { 
    createAnecdote, 
    setNotification,
  }

  const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
  )(AnecdoteForm)


export default ConnectedAnecdoteForm;
