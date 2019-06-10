import React, { useState } from 'react'
import ReactDOM from 'react-dom'


/*
 STEP 3 DONE
*/


const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )
let points = Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0)


const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [vote, setVote] = useState(0)
    const [index, setIndex] = useState(0)
    const handleNextClick =() =>{
        const number = Math.floor(Math.random() * 6)
        setSelected(number)
    }

    const handleVoteClick = () => {
        points = updatePoints(selected, points)
        setVote(vote +1)
        for(let i of Object.keys(points)){
            if (points[i] > points[index]){
                setIndex(i)
            }
        }   
    }

    const updatePoints = (num, array) =>{
        const copy = {...array}
        copy[num] +=1
        return copy
    }


    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>Has {points[selected]} votes</p>
            <Button handleClick = {handleVoteClick} text = 'vote' />
            <Button handleClick = {handleNextClick} text = 'next anecdote' />
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[index]}</p>
        </div> 
       
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)