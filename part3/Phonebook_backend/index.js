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



const PORT = 3001
app.listen(PORT)
console.log(`server is running on port ${PORT}`)