import { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  )
}

const Display = (props) => {
  return (
    <>
      <p>Good {props.good}</p>
      <p>Neutral {props.neutral}</p>
      <p>Bad {props.bad}</p>
    </>
  )
}


const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {setGood(good + 1)};
  const handleClickNeutral = () => {setNeutral(neutral + 1)};
  const handleClickBad = () => {setBad(bad + 1)};

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={handleClickGood} text='good' />
      <Button handleClick={handleClickNeutral} text='neutral' />
      <Button handleClick={handleClickBad} text='bad' />
      <h1>Statistics</h1>
      <Display good={good} neutral={neutral} bad={bad}/>
    </>
  );
}

export default App;
