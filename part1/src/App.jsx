const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  );
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.p1} ex={props.e1} />
      <Part part={props.p2} ex={props.e2} />
      <Part part={props.p3} ex={props.e3} />
    </div>
  );
}

const Part = (props) => {
  return (
    <p>{props.part} {props.ex}</p>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>
    </div>
  );
}



const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header text={course} />
      <Content p1={part1.name} e1={part1.exercises} p2={part2.name} e2={part2.exercises} p3={part3.name} e3={part3.name} />
      <Total e1={part1.exercises} e2={part2.exercises} e3={part3.exercises} />
    </div>
  )
}

export default App