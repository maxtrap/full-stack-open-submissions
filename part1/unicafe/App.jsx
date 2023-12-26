import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, stat, endtext }) =>
  <tr>
    <td>{text}</td>
    <td>{stat} {endtext}</td>
  </tr>

const Statistics = ({ good, neutral, bad, total }) => {
  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" stat={good} />
        <StatisticLine text="neutral" stat={neutral} />
        <StatisticLine text="bad" stat={bad} />
        <StatisticLine text="all" stat={total} />
        <StatisticLine text="average" stat={(good - bad) / total} />
        <StatisticLine text="positive" stat={good / total * 100} endtext={"%"} />
      </tbody>
    </table>
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