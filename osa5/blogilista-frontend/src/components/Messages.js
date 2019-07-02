import React from 'react'
import '../index.css'

const Notification1 = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="message">
            {message}
        </div>
    )
}
const ErrorMessage1= ({ error }) => {
    if (error === null) {
        return null
    }
    return (
        <div className="error">
            {error}
        </div>
    )
}

export default { Notification1, ErrorMessage1 }