import './index.css'
const Notification = (props) => {
    if (props.status === 'personAdd'){
        return <div className="notification">Added name {props.name} and his/her number is {props.number}</div>
    }else if(props.status === 'numberChange'){
        return <div className="notification">changed number to {props.number} for name {props.name}</div>
    }else{
        return null
    }
}

export default Notification