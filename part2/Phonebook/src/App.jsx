import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Display_name from './components/Display'
import methods from './services/methods'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [shown_persons, setShown_Persons] = useState(persons) 
  useEffect(() => {
    methods.getall().then(response => {
      setPersons(response.data)
      setShown_Persons(response.data)
    })  
  },[])
  const check_duplicate = (array, name) => {
    if (array.includes(name)){
      return true
    }
    else{
      return false
    }
  }
  const filter_func = (array, name) => {
    if (name !== " "){
      const regex = new RegExp(String(name),'i')
      const new_array = array.filter(each => regex.test(each.name))
      return new_array
    }
    else{
      return persons
    }
  }
  const add_func = (event) => {
    event.preventDefault()
    const newObject ={
      name : newName,
      number : newNumber,
      id : String(persons.length + 1)
    }
    const duplicate_name_checker = check_duplicate(persons.map(element => element.name),newName)
    if (duplicate_name_checker === true){
      alert(newName + ' is already added to phonebook')
      return
    }
    methods.create(newObject).then(response => {
        const updatedPersons = [...persons, response.data]
        setPersons(updatedPersons)
        setShown_Persons(filter_func(updatedPersons, newFilter))
      })
  }
  const HandleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }
  const HandleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }
  const HandleFilterChange = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
    const filter_result = filter_func(persons.map(element => element),event.target.value)
    setShown_Persons(filter_result)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} HandleFilterChange={HandleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm add_func={add_func} newName={newName} HandleNameChange={HandleNameChange} newNumber={newNumber} HandleNumberChange={HandleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        {shown_persons.map(element => <Display_name name={element.name} key={element.name} number={element.number}/>)}
      </ul>
    </div>
  )
}

export default App