const PersonForm = (props) => {
return(
    <div>
    <form onSubmit={props.add_func} >
    <div>
      name: <input value={props.newName} onChange={props.HandleNameChange}/>
      number: <input value={props.newNumber} onChange={props.HandleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
    </div>
)
}

export default PersonForm