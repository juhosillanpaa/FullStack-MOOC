// STEP 8 DONE (3.8 )
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.static('build'))
app.use(bodyParser.json())

app.use(cors())
morgan.token('data', function getData (req) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time :data'))



/*
let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
  ]

/*
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})*/

let persons = []


app.get('/info',(req, res) => {
    const len = persons.length
    const date = new Date()
    const view = `<p>PhoneBook has info for ${len} people</p><p>${date}</p>`
    res.send(view)
})

app.get('/api/persons', (req, res, next) => {
    console.log('getting all persons')
    Person.find({})
        .then(persons => {
            res.json(persons)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req,res,next) => {
    console.log(`first ${req.params.id} after ${req.params.id}`)
    const id = req.params.id
    Person.findById(id)
        .then(person => {
            if (person) {
                res.json(person.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    console.log('deleting person')
    console.log(req.params)
    const id = req.params.id
    Person.findByIdAndRemove(id)
        .then( res.status(204).end())
        .catch( error => next(error))
})

app.post('/api/persons', (req, res,next) => {
    const body = req.body
    if (!body.name) {
        return res.status(400).json({
            error: ' name is missing'
        })
    }
    if (!body.number) {
        return res.status(400).json({
            error: 'Number is missing'
        })
    }
    if (persons.some(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        id: body.id,
    })

    persons = persons.concat(person)
    person.save()
        .then(savedPerson => {
            res.json(savedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const temp = {
        name: body.name,
        number: body.number,
    }
    Person.findByIdAndUpdate(req.params.id, temp, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})


const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})