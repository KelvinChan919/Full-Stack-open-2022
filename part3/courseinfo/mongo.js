const mongoose = require('mongoose')

const password = process.argv[2]
const phonebook_name = process.argv[3]
const phonebook_number = process.argv[4]

const url = `mongodb+srv://root:${password}@cluster0.hj0prqc.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name:String,
    number:String,
})

const Note = mongoose.model('Note', noteSchema)

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
else if(process.argv.length === 3){
    console.log('phonebook:')
    Note.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}else if(process.argv.length === 4){
    console.log('neither name or number cannot be empty')
    process.exit(1)
}else if(process.argv.length === 5){
    const note = new Note({
        name : phonebook_name,
        number : phonebook_number
      })
    note.save().then(result => {
        console.log('note saved!')
        mongoose.connection.close()
    })
}









