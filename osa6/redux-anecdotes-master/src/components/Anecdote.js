import React from 'react'

const Anecdote = ({anecdote, handleClick}) => {
    return (
        <li>
            {anecdote.content}
            <br/>
            <p>has {anecdote.votes} votes <button onClick = {handleClick}>vote</button></p>
        </li>
    )
}

export default Anecdote