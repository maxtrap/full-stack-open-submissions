const Header = (props) => {
    return (
      <h3>{props.name}</h3>
    );
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </div>
    );
  }
  
  const Part = (props) => {
    return (
      <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  
  const Total = ({ parts }) => {
    return (
      <div>
        <p><b>Total of {parts.reduce((accumulator, part) => accumulator + part.exercises, 0)} exercises</b></p>
      </div>
    );
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  };

  export default Course;