import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../reducers/loginReducer'


const Menu = (props) => {
    return (
        <div>
            <Link to = '/'>Home</Link>
            <Link to = '/users' href = '#' >Users</Link>
            <Link to = '/create' href = '#' >Create new</Link>
            <Link to = '/blogs' href = '#' >Blogs</Link>
            <p>{props.loggedUser.username} logged in <button onClick = {props.logOut}>log out</button></p>

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