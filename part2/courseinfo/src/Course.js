
const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Total of {sum} exercises</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    { parts.map((part) => <Part key={part.id} part={part} />) }
  </>

const Course = ({course}) => 
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((prev, curr) => prev + curr.exercises, 0 ) } />
  </>

export default Course;