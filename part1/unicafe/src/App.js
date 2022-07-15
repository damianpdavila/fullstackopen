import { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props;
  const total = good + neutral + bad;
  let average = 0;
  let postive = 0;

  if (total > 0) {
    average = (good*1 + neutral*0 + bad*-1)/total;
    postive = good/total*100;
  }
  
  return (
    <>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {total}</p>
      <p>Average {average}</p>
      <p>Positive {postive} %</p>
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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  );
}

export default App;
