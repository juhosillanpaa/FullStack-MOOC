
import React, { useEffect } from 'react'
//import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'

import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import Menu from './components/Menu'




const App = (props) => {
    useEffect(() => {
        props.initializeBlogs()
        // eslint-disable-next-line
    },[])


    const blogById = ( id ) => {
        console.log(`wanted id is ${id}`)

        const writedBlogs = props.blogs.filter(blog => blog.id === id)
        return writedBlogs[0]
    }


    // ---------------------------- RETURN-----------------
    return (
        <div>
            <Router>
                <div className = "container">
                    <div className = "textContainer">
                        <h1>Notes</h1>
                    </div>

                    <Notification />

                    <div className = "textContainer">
                        <h2>Login</h2>
                    </div>

                    {props.loggedUser === '' ?
                        <LoginForm /> :
                        <div>
                            <Menu />
                            <Route exact path = '/' render = {() =>
                                <div>
                                    <Users />
                                    <BlogForm />
                                    <BlogList />
                                </div>
                            } />

                            <Route exact path = '/users/:id' render = {({ match }) =>
                                <SingleUser id = { match.params.id } />
                            } />
                            <Route path = '/users' render = {() =>
                                <Users />
                            } />


                            <Route exact path = '/blogs/:id' render = {({ match }) =>
                                <SingleBlog blog = {blogById(match.params.id)} />
                            } />
                            <Route exact path = '/blogs' render = {() =>
                                <BlogList />
                            } />


                            <Route exact path = '/create' render = {() =>
                                <BlogForm />
                            } />
                        </div>
                    }
                </div>
            </Router>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.loggedUser,
        blogs: state.blogs,
    }
}

export default connect(
    mapStateToProps,
    { initializeBlogs, }
)(App)