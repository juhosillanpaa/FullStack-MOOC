


// STEP 8 DONE (3.8)



const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
var morgan = require('morgan')
var cors = require('cors')
app.use(cors())

morgan.token('data', function getData (req) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time :data'))


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


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info',(req, res) =>{
    const len = persons.length
    const date = new Date()
    const view = `<p>PhoneBook has info for ${len} people</p><p>${date}</p>`
    res.send(view)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})
app.get('/api/persons/:id', (req,res) =>{
    
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person){
        res.json(person)
    } else {
        res.status(404).end()
    } 
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
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

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random()*Math.floor(10000)),
    }
    
    persons = persons.concat(person)
    res.json(person)
    
})




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})