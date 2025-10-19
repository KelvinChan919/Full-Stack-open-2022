const Courses = (courses) => {
    return(
      <div>
        <h1>{courses.name}</h1>
        <ul>
          {courses.each}
        </ul>
        <p>total of {courses.total} exercises</p>
      </div>
    )
  }
  
  const Course = (course) => {
      return(
        <li>{course.name} {course.exercises}</li>
      )
  }

  export {Courses,Course}