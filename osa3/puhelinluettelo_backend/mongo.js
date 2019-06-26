/* eslint-disable no-undef */

const mongoose = require('mongoose')
/*
if (process.argv.length <5) {
  console.log("some parameters are missing")
  process.exit(1)
}
*/

const password = process.argv[2]

const url = `mongodb+srv://juhosillanpaa:${password}@cluster0-xgrr8.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length!==3 && process.argv.length !== 5) {
    console.log('input should have 5 prameters!')
    mongoose.connection.close()

    process.exit(1)
}

if ( process.argv.length===3 ) {
    console.log('phonebook:')
    Person.find({})
        .then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
            process.exit(1)
        })

}
if (process.argv.length === 5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save()
        .then(() => {
            console.log(`Added ${person.name} number ${person.number}`)
            mongoose.connection.close()
            process.exit(1)
        }).catch(response => {
            console.log('error ctached', response)
        })
}
