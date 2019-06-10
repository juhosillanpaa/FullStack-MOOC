import React, { useState } from 'react'
import ReactDOM from 'react-dom'

/*
step 6 done (1.11*)
*/


const Statistic = ({text, value}) =>{
    return (
        <>
        <tr>
        <td>{text}</td> 
        <td>{value}</td>
        </tr>
        </>
    )
}

const Button = ({handleClick, text}) =>(
    <button onClick = {handleClick}>
        {text}
    </button>
)

const Statistics = ({good,neutral,bad}) =>{
    const average = (props) => (props[0] - props[2]) / (props[0] + props[1] + props[2])
    const positive = (props) => props[0] / props[1]
 
    if (good + neutral + bad === 0){
        return (
            <>
            <h1>Statistics</h1>
            <p>No feedback given</p>
            </>
        )
    }
    return(
        <>
        <h1>Statistics</h1>
        <table>
            <tbody>
                <Statistic text = "Good" value = {good} />
                <Statistic text = "Neutral" value = {neutral} />
                <Statistic text = "Bad" value = {bad} />
                <Statistic text = "All" value = {good + neutral + bad} />
                <Statistic text = "Average" value = {average([good, neutral, bad])} />
                <Statistic text = "Positive" value = {positive([good, good + neutral + bad])} />
            </tbody>
        </table>
        </>
    ) 
}




const App = (props) => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    const handleGoodClick = () => {
        setGood(good + 1)
    }
    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }
    const handleBadClick = () =>{
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>Give Feedback</h1>
            <div>
            <Button handleClick={handleGoodClick} text='good' />
            <Button handleClick={handleNeutralClick} text='neutral' />
            <Button handleClick={handleBadClick} text='bad' />
            </div>
            <Statistics good = {good} neutral = {neutral} bad = {bad} />
        </div>
    )
}




ReactDOM.render(
    <App />,
    document.getElementById('root')
  )