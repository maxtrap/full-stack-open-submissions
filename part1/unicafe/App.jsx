import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const DisplayStat = ({ text, stat, endtext }) => <p>{text}: {stat} {endtext}</p>

const Statistics = ({ good, neutral, bad, total }) => {
  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <DisplayStat text="good" stat={good} />
      <DisplayStat text="neutral" stat={neutral} />
      <DisplayStat text="bad" stat={bad} />
      <DisplayStat text="all" stat={total} />
      <DisplayStat text="average" stat={(good - bad) / total} />
      <DisplayStat text="positive" stat={good / total * 100} endtext={"%"} />
    </div>
  );
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [total, setTotal] = useState(0)

  const handleGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };

  return (
    <div>
      <Header text="Give your feedback:" />

      <Button onClick={() => handleGood()} text="good" />
      <Button onClick={() => handleNeutral()} text="neutral" />
      <Button onClick={() => handleBad()} text="bad" />

      <Header text="Statistics:" />

      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App