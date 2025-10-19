import { useState } from 'react'

const Display_name = (props) =>{
  return(
    <li>{props.name} {props.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number : '040-1234567'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const check_duplicate = (array, name) => {
    if (array.includes(name)){
      return true
    }
    else{
      return false
    }
  }
  const add_func = (event) => {
    event.preventDefault()
    const newObject ={
      name : newName,
      number : newNumber
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
  const HandleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={add_func}>
        <div>
          name: <input value={newName} onChange={HandleNameChange}/>
          number: <input value={newNumber} onChange={HandleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(element => <Display_name name={element.name} key={element.name} number={element.number}/>)}
      </ul>
    </div>
  )
}

export default App