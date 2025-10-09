const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part part={props.part['components'][0]}/>
      <Part part={props.part['components'][1]}/>
      <Part part={props.part['components'][2]}/>
    </div>
  )
}

const Part = (props) => {
  return(
    <p>{props.part['part']} {props.part['exercises']}</p>
  )
}

const App = () => {
  const course = {
    'course_name':'Half Stack application development',
    'components' : [
      {'part': 'Fundamentals of React', 'exercises':10},
      {'part': 'Using props to pass data', 'exercises':7},
      {'part': 'State of a component', 'exercises':14}
    ]
  }
  return (
    <div>
      <Header course={course['course_name']}/>
      <Content part={course}/>
    </div>
  )
}

export default App
