const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.set('strictQuery',false)
mongoose.connect(url)   


console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneBookSchema = new mongoose.Schema({
    name:{
      type: String,
      minLength: 3,
      validate : {
        validator : function (regex) {
          return
        },
        message: 'the name has to be at least 3 characters long'
      },
      required: true
    },
    number:{
      type: String,
      validate: {
        validator : function (regex) {
          return /\d{2,3}-\d{1,}/.test(regex);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      minLength : 8,
      required : true,
    },
})

phoneBookSchema.set('toJSON',{
    transform:(document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
    
module.exports = mongoose.model('PhoneBook', phoneBookSchema)