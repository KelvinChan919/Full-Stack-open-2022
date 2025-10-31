require('dotenv').config()
const express = require('express')
const app = express()
const PhoneBook = require('./phonebook')
const phonebook = require('./phonebook')
app.use(express.json())

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
}
app.get('/api/persons', (request,response) => {
    PhoneBook.find({}).then((entry) => {
        response.json(entry)
    })
})

app.get('/info', (request, response) => {
    response.send(`<h1>Phonebook has info for ${persons.length} persons</h1> <h1>${new Date()}</h1>`)
    
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    PhoneBook.findById(id).then((entry) => {
        if(entry){
            response.json(entry)
        }else{
            console.log('not found')
            response.status(404).end()
        }
    })
    .catch((err) =>{
        next(err)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    PhoneBook.findByIdAndDelete(request.params.id).then(result => {
        if(result){
            response.status(204).end()
        }else{
            response.status(404).json({error:"the entry to be deleted does not exist anymore"})
        }
    }).catch((err) =>{
        next(err)
    })
})

app.put('/api/persons/:id', (request,response,next) => {
    const {name,number} = request.body
    const id = request.params.id
    PhoneBook.findById(id).then(entry => {
        if(!entry){
            return response.status(404).end()
        }else{
            console.log(entry)
            entry.name = name
            entry.number = number
            entry.save().then((saved) => {
                response.json(saved)
            })
        }
    }).catch(err => {
        next(err)
    })
})

app.post('/api/persons', async (request,response) => {
    const body = request.body
    if(!body){
        return response.status(400).json({ error:'content is missing'})
    }
    const new_entry = new PhoneBook({
        name:body.name,
        number:body.number,
    })

    const current_array = await PhoneBook.find({})
    const name_match = (current_array.filter(element => element.name === new_entry.name).length > 0)
    if (new_entry.number === '' || new_entry.name === ''){
        return response.status(400).end('neither name or number cannot be empty')
    }
    else if(name_match){
        return response.status(400).end('The name already exists in the phonebook')
    }
    new_entry.save().then((saved) => {
        response.json(saved)
    })
    
})


app.use(unknownEndpoint)
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT)
console.log(`server is running on port ${PORT}`)