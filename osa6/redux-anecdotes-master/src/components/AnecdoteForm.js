import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'


const AnecdoteForm = ( props ) => {
    const addAnecdote = async ( e ) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        props.createAnecdote(content)

        props.showNotification(`new anecdote added`, 5)
    }


    return (
        <>
        <h3>Create new anecdote</h3>
        <form onSubmit = {addAnecdote}>
            <input name = "anecdote"/>
            <button type = "submit" >create</button>
      </form>
      </>
    )
}


export default connect(
    null,
    { createAnecdote, showNotification }
)(AnecdoteForm)