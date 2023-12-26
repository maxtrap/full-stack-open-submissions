import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) =><button onClick={onClick}>{text}</button>;

const DisplayFeedback = ({ text, numRatings }) => <p>{text}: {numRatings}</p>
  


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="Give your feedback:" />

      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <Header text="Statistics:" />

      <DisplayFeedback text="good" numRatings={good} />
      <DisplayFeedback text="neutral" numRatings={neutral} />
      <DisplayFeedback text="bad" numRatings={bad} />
    </div>
  )
}

export default App