import {Courses,Course} from "./Component";



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return(
    <div>
      {courses.map(element =>{
        const course_name = element.name
        const course_id = element.id
        const course_parts = element.parts
        const each_total = course_parts.map(element => element.exercises).reduce((accumulator, currentvalue) => accumulator + currentvalue)
        const parts_components = course_parts.map(component => <Course name={component.name} exercises={component.exercises} key={component.id}/>)
        return(
          <Courses name={course_name} key={course_id} each={parts_components} total={each_total}/>
        )
      })}
    </div>
  )
}

export default App