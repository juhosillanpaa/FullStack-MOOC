import React from 'react'
import '../index.css'

const ErrorMessage= ({ error }) => {
    if (error === null) {
        return null
    }
    return (
        <div className="error">
            {error}
        </div>
    )
}

export default ErrorMessage