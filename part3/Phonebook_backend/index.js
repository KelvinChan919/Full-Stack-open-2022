const express = require('express')
const app = express()

app.use(express.json())

persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
        "id": "5",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get('/api/persons', (request,response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<h1>Phonebook has info for ${persons.length} persons</h1> <h1>${new Date()}</h1>`)
    
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const feedback = persons.filter(element => element.id === id)

    if (feedback){
        response.json(feedback)
    }
    else{
        response.status(404).end()
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const if_exist = (persons.filter(element => element.id === id).length > 0)
    if(if_exist){
        persons = persons.filter(element => element.id !== id)
        response.status(200).end(`the entry ${id} has been successfully deleted`)
    }
    else{
        response.status(404).end('the entry to be deleted does not exist')
    }
})

app.post('/api/persons', (request,response) => {
    const id = Math.floor(Math.random() * 1000000000)
    const new_entry = request.body
    const name_match = (persons.filter(element => element.name === new_entry.name).length > 0)
    if (new_entry.number === '' || new_entry.name === ''){
        return response.status(400).end('neither name or number cannot be empty')
    }
    else if(name_match){
        return response.status(400).end('The name already exists in the phonebook')
    }
    new_entry.id = id
    response.json(new_entry)
    persons = persons.concat(new_entry)
})


const PORT = 3001
app.listen(PORT)
console.log(`server is running on port ${PORT}`)