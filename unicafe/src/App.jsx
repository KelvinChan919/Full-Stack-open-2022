import { useState } from 'react'

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all == 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return(
    <div>
      <table>
        <tbody>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={props.all} />
        <StatisticLine text="average" value ={props.average} />
        <StatisticLine text="positive" value ={props.positive} />
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const good_feedback = () => {setGood(good+1)}
  const neutral_feedback = () => {setNeutral(neutral+1)}
  const bad_feedback = () => {setBad(bad+1)}
  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={good_feedback} text={'good'}/>
        <Button onClick={neutral_feedback} text={'neutral'}/>
        <Button onClick={bad_feedback} text={'bad'}/>
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={bad+good+neutral} average={(1*good+(-1)*bad)/(bad+good+neutral)} positive={((good)/(bad+good+neutral))*100} />
    </div>
  )
}

export default App