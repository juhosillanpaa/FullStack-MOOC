
import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'


const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="message">
        {message}
      </div>
    )
  }
  const Error= ({ error }) => {
    if (error === null) {
      return null
    }
    return (
      <div className="error">
        {error}
      </div>
    )
  }





const Button = ({handler1}) => (
    <button onClick = {handler1}>
        delete
    </button>
)

const Person = ({person,handler1}) =>{
    return (
        <li>{person.name} {person.number} <Button handler1 = {handler1} /> </li>
    )
}
const Filter = ({filter, handler}) => {
    return(
        <div>
            filter shown with<input
            value = {filter}
            onChange = {handler}
            />
        </div>
    )
}
const PersonForm = ({onSubmit, name, handler1, number, handler2}) => {
    return (
        <>
        <form onSubmit = {onSubmit}>
            <div>
                name: <input 
                value = {name}
                onChange = {handler1}
                />
            </div>
            <div>number: <input 
                value = {number}
                onChange = {handler2}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}
const Persons = ({rows}) => {
    return(
        <>
        {rows}
        </>
    )  
}


const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [newFilter, setNewFilter ] = useState('')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    const handleFilterChange = (event) => setNewFilter(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    const handleNameChange = (event) => setNewName(event.target.value)
    const showMessage = (text) =>{
        setMessage(text)
        setTimeout(() =>{
            setMessage(null)}, 4000)
    }
    const showError = (text) =>{
        setError(text)
        setTimeout(() =>{
            setError(null)}, 4000)
    }
    const hook = () => {
        personService
          .getAll()
          .then(response => setPersons(response))
          
    }
    useEffect(hook, [])
    
    const namesToShow = !newFilter
    ? persons
    : persons.filter(person =>person.name.toLowerCase().includes(newFilter.toLowerCase()))

    const rows = () => namesToShow.map(person =>
        <Person
            key = {person.name}
            person = {person}
            handler1 = {() => {
                if (window.confirm("Do you really want to delete contact?")){
                    personService
                        .deletePerson(person.id)
                        .then(response =>{
                            showMessage(`Person ${person.name} was deleted succesfully`)
                            hook()
                        })  
                        .catch(error =>{
                            console.log(error)
                            showError(`Person ${person.name} was already deleted from server`)
                            hook()
                        })  
                }
            }}

        />
    )

    const addName = (event) => {
		event.preventDefault()
		const noteObject = {
            name: newName,
            number: newNumber
        }
        if (!persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length >0){
            if (noteObject.number) {
                personService
                    .create(noteObject)
                    .then(response => {
                        showMessage(`Person ${newName} was added succesfully`)
                        setPersons(persons.concat(response))
                    })
                    .catch(error =>{
                        showError(`${error.response.data.error}`)
                        console.log(error.response.data.error)
                    })
            } else {
                alert("Number is missing")
            }
        }
        else{
            if (window.confirm(`${newName} is already added to phonebook. Do you want to update the number?`)){
                const temp = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
                personService
                    .update(temp.id, noteObject)
                    .then(response =>{
                        showMessage(`Number of ${temp.name} was updated succesfully`)
                        hook()
                    })
                    .catch(error => console.log(error))
            }
        }
        setNewName('')
        setNewNumber('')
        
	}

    

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message = {message}/>
            <Error error = {error} />
            <Filter filter = {newFilter} handler = {handleFilterChange}/>
            
            <h3>Add a new</h3>
            <PersonForm onSubmit = {addName} name = {newName} handler1 = {handleNameChange} number = {newNumber} handler2 = {handleNumberChange} />
            
            <h2>Numbers</h2>
            <Persons rows = {rows()} />
        </div>
    )     
}


export default App