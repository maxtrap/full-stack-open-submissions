const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>Hello {props.name}, you weigh {props.weight} pounds</p>
    </div>
  );
}

const App = () => {
  const name = 'Patrick Mahomes';
  const weight = 225;

  return (
    <div>
      <h1>Greetings human!</h1>
      <Hello name={name} weight={weight} />
      <Hello name='Lizzo' weight={203023+32423424}  />
    </div>
  )
}

export default App