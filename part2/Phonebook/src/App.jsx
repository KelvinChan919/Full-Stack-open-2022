import { useState } from 'react'

const Display_name = (props) =>{
  return(
    <li>{props.name}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const check_duplicate = (array, name) => {
    if (array.includes(name)){
      return true
    }
    else{
      return false
    }
  }
  const add_name_func = (event) => {
    event.preventDefault()
    const newObject ={
      name : newName
    }
    const duplicate_name_checker = check_duplicate(persons.map(element => element.name),newName)
    if (duplicate_name_checker === false){
      setPersons(persons.concat(newObject))
    }
    else{
      alert(newName + ' is already added to phonebook')
    }
    
  }
  const HandleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={add_name_func}>
        <div>
          name: <input value={newName} onChange={HandleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(element => <Display_name name={element.name} key={element.name}/>)}
      </ul>
    </div>
  )
}

export default App