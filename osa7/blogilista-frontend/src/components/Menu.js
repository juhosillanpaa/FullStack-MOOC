import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../reducers/loginReducer'
import '../index.css'


const Menu = (props) => {
    return (
        <div className = "textContainer">
            <Link className = "customButton" to = '/'>Home</Link>
            <Link className = "customButton" to = '/users' href = '#' >Users</Link>
            <Link className = "customButton" to = '/create' href = '#' >Create new</Link>
            <Link className = "customButton" to = '/blogs' href = '#' >Blogs</Link>
            <p className = "customButton">{props.loggedUser.username} logged in <button className = "buttonbutton" onClick = {props.logOut}>log out</button></p>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        loggedUser: state.loggedUser,
    }
}

export default connect(
    mapStateToProps,
    { logOut, }
)(Menu)