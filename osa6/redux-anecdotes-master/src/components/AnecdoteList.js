import React from 'react'
import Anecdote from './Anecdote'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = ( props ) => {
    
    return (
        <div>
            {props.visibleAnecdotes.map(anecdote =>
                <Anecdote
                    key = {anecdote.id}
                    anecdote = {anecdote}
                    handleClick = {() => {
                        props.voteAnecdote(anecdote)
                        props.showNotification(`you voted '${anecdote.content}'`,5)
                    }}
                />
            )}
        </div>
    )
}

const anecdotesToShow = ({anecdotes, filter}) => {
    const temp = !filter
        ? anecdotes
        : anecdotes.filter(item => item.content.toLowerCase().includes(filter.toLowerCase()))
    temp.sort(function(a, b) {
        return b.votes - a.votes
    })
        
    return temp
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state),
    }
}
const mapDispatchToProps = {
    voteAnecdote,
    showNotification,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)