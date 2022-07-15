import { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <tr><td>{props.text}</td><td>{props.value}</td></tr>
    </>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props;
  const total = good + neutral + bad;
  let average = 0;
  let positive = 0;

  if (total > 0) {
    average = (good*1 + neutral*0 + bad*-1)/total;
    positive = (good/total*100).toString().concat(' %');
  } else {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={positive} />
        </tbody>
      </table>
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
