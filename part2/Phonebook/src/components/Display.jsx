const Display_name = (props) =>{
    return(
      <div>
        <li>{props.name} {props.number} <button onClick={props.handleDelete} id={props.button_id}>delete</button></li>
      </div>
    )
  }

export default Display_name