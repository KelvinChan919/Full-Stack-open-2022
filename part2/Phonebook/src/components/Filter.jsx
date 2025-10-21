const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.newFilter} onChange={props.HandleFilterChange}/>
  </div>
  )
}

export default Filter