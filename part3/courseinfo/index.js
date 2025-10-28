const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    }
  ]

app.get('/',(request,response) => {
    response.send('<h1>hello world</h1>')
})

app.get('/notes',(request,response) => {
    response.json(notes)
})

app.get('/notes/:id',(request,response) => {
    const id = request.params.id
    const note = notes.filter(note => note.id === id)
    if (note){
        response.json(note)
    }
    else{
        response.status(404).end()
    }
})

app.post('/notes', (request,response) => {
    const note = request.body
    console.log(note)
    response.json(note)
})

app.delete('/notes/:id', (request,response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    
    response.status(204).end()
})

const PORT =3001
app.listen(PORT, ()=>{
    console.log(`the app is listening on port ${PORT}`)
})