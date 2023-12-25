const Hello = (props) => (
  <div>
    <p>Hello {props.name}</p>
  </div>
)

const App = () => (
  <div>
    <h1>Greetings human!</h1>
    <Hello name='George' />
    <Hello name='Yellow hat man' />
  </div>
)

export default App