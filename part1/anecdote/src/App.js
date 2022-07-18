import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  console.log(anecdotes);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const [selected, setSelected] = useState(0);
  const [mostVotes, setMostVotes] = useState(0);

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const nextAnecdote = () => {
    const next_int = getRandomInt(0, anecdotes.length - 1);
    return setSelected(next_int);
  };

  const vote = () => {
    const new_votes = [...votes];
    new_votes[selected] = votes[selected] + 1;

    if (new_votes[selected] > new_votes[mostVotes]) {
      setMostVotes(selected);
    }
    console.log(new_votes);
    return setVotes(new_votes);
  }

  return (
    <>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={vote}>Vote</button>
      <button onClick={nextAnecdote}>Next Anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotes]}</p>
      <p>has {votes[mostVotes]} votes</p>

    </>
  );
}

export default App;
