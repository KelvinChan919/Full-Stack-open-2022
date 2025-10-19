const Course = (course) => {
    return(
      <li>{course.name} {course.exercises}</li>
    )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  const total = (course.parts.map(element => element.exercises)).reduce((accumulator, currentvalue) => accumulator + currentvalue)

  return(
    <div>
      <h1>{course.name}</h1>
      <ul>  
        {course.parts.map(course =>
          <Course key={course.id} name={course.name} exercises={course.exercises}/>
        )}
      </ul>
      <p>total of {total} exercises</p>
    </div>
  )
}

export default App