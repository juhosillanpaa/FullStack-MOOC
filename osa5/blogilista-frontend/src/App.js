
import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import { useField } from './hooks/index'




const App = () => {
    //states for new blog
    const newTitle = useField('text')
    const newAuthor = useField('text')
    const newUrl = useField('text')

    //states for showing messages
    const [errorMessage, setErrorMessage] = useState(null)
    const [notification, setNotification] = useState(null)
    const showErrorMessage = (text) => {
        setErrorMessage(text)
        setTimeout(() => {
            setErrorMessage(null)}, 4000)
    }
    const showNotification = (text) => {
        setNotification(text)
        setTimeout(() => {
            setNotification(null)}, 4000)
    }

    const [blogs, setBlogs] = useState([])

    const username = useField('text')
    const password = useField('password')
    const [user, setUser] = useState(null)

    //------------USE EFFECT HOOKS ----------------------------------------------------------
    useEffect(() => {
        blogService
            .getAll().then(initialBlogs => {
                setBlogs(initialBlogs)
            })
    }, [])
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    // -------------LOGIN -------------------------------------------------------
    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username.value, password.value)
        try {
            const user = await loginService.login({
                username: username.value,
                password: password.value
            })
            window.localStorage.setItem(
                'loggedBloglistUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            showNotification(`logged in as ${username.value}`)
            setUser(user)
            username.reset()
            password.reset()

        } catch (exception) {
            showErrorMessage('wrong credentials')
        }
    }

    const loginForm = () => {
        return (
            <form onSubmit={handleLogin}>
                <div className = 'LoginForm'>
                username:
                    <input { ...username.bind }/>
                    <br/>
                password:
                    <input { ...password.bind }/>
                </div>
                <button type="submit">login</button>
            </form>
        )
    }

    //------------------ NEW BLOG --------------------------------------------
    const addNewBlog = async (event) => {
        event.preventDefault()
        const newObj = {
            title: newTitle.value,
            author: newAuthor.value,
            url: newUrl.value
        }
        blogFormRef.current.toggleVisibility()
        try {
            const postedBlog = await blogService.create(newObj)
            newAuthor.reset()
            newTitle.reset()
            newUrl.reset()
            setBlogs(blogs.concat(postedBlog))
            showNotification(`a new blog ${postedBlog.title} added!`)

        } catch (exception) {
            console.log(exception)
            setErrorMessage('Something went wrong with adding new blog')
        }
    }

    //--------------BLOG VIEW-------------------------------------------
    const blogView = () => {
        const rows = blogs.map(b =>
            <Blog
                key = {b.id}
                blog = {b}
            />
        )
        return (
            <div>
                <p>Blogs</p>
                {rows}
            </div>
        )
    }


    //-------------------------BLOG FORM ------------------------------
    const blogFormRef = React.createRef()
    const blogForm = () => (
        <Toggleable buttonLabel = 'create new blog' ref = {blogFormRef}>
            <BlogForm
                addNewBlog = {addNewBlog}
                newTitle = {newTitle}
                newAuthor = {newAuthor}
                newUrl = {newUrl}
            />
        </Toggleable>
    )


    //------------------------------ LOG OUT --------------------------------------
    const logOut = () => {
        window.localStorage.removeItem('loggedBloglistUser')
        blogService.setToken(null)
        setUser(null)
        showNotification('Logged out')
    }

    // ---------------------------- RETURN-----------------
    return (
        <div>
            <h1>Notes</h1>
            <ErrorMessage error = { errorMessage } />
            <Notification message = { notification }/>

            <h2>Login</h2>
            {user === null ?
                loginForm() :
                <div>
                    <p>{user.name} logged in</p>
                    <button onClick = {logOut}>logout</button>
                    {blogForm()}
                    {blogView()}
                </div>
            }
        </div>
    )
}

export default App