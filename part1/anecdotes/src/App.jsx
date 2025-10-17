import { useState } from 'react'



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const vote_array = new Uint8Array(anecdotes.length)
  const [vote, setvote] = useState(vote_array)
  const [show_vote, set_show_vote] = useState(0)
  const [selected, setSelected] = useState(0)
  const [biggest_index, set_biggest_index] = useState(0)
  const [biggest_vote, set_biggest_vote] = useState(0)
  const vote_func = () => {
    vote[selected] += 1
    const new_vote = vote
    setvote(new_vote)
    set_show_vote(vote[selected])
    const max_num = Math.max(...new_vote)
    const max_index = new_vote.indexOf(max_num)
    set_biggest_index(max_index)
    set_biggest_vote(max_num)
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const gen_random_num = () =>{
    setSelected(getRandomInt(anecdotes.length))
  }
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>has {vote[selected]} votes</div>
      <div><button onClick={vote_func}>vote</button></div>
      <div><button onClick={gen_random_num}>next anecdote</button></div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[biggest_index]}
      <div>has {biggest_vote} votes</div>
    </div>
  )
}

export default App