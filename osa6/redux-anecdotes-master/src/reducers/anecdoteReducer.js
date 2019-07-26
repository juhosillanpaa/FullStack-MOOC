import anecdoteService from '../services/anecdotes'


const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      return state.map(a =>
        a.id !== id ? a : action.data
        )

    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  const newObj = {
    ...anecdote,
    votes: anecdote.votes +1
  }
  return async dispatch => {
    await anecdoteService.update(anecdote.id, newObj)
    dispatch({
      type: 'VOTE',
      data: newObj,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}
export default anecdoteReducer