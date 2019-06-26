const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
var uniqueValidator = require('mongoose-unique-validator')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI
console.log(`Connecting to ${url}`)
mongoose.connect(url, { useNewUrlParser: true })
    .then(console.log('Connected to MongoDB'))
    .catch((error) => {
        console.log(`Error connecting to MongoBD: ${error.message}`)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        minlength: 3
    },
    number: {
        type: String,
        minlength: 8
    },
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)