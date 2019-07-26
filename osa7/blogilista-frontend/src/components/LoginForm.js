import React from 'react'
import { connect } from 'react-redux'
import { logIn } from '../reducers/loginReducer'


// -------------LOGIN -------------------------------------------------------


const LoginForm = ( props) => {

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log('logging in with', e.target.username.value, e.target.password.value)
        const tempname = e.target.username.value
        const temppassword = e.target.password.value

        await props.logIn(tempname, temppassword)
        /*
            window.localStorage.setItem(
                'loggedBloglistUser', JSON.stringify(user)
            )/*
            blogService.setToken(user.token)
            //showNotification(`logged in as ${username.value}`)
            setUser(user)*/

        //showErrorMessage('wrong credentials')
    }



    return (
        <form onSubmit={handleLogin}>
            <div className = 'LoginForm'>
            username:
                <input name = 'username'/>
                <br/>
            password:
                <input name = 'password' />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default connect(
    null,
    { logIn }
)(LoginForm)