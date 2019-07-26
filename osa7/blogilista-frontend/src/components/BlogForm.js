import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {
    const addBlog = async ( e ) => {
        e.preventDefault()
        const newObj = {
            title: e.target.title.value,
            author: e.target.author.value,
            url: e.target.url.value
        }
        e.target.url.value = ''
        e.target.author.value = ''
        e.target.title.value = ''
        props.createBlog(newObj)
        props.showNotification('New blog added!', 5)
    }
    return (
        <div className = "form">
            <h3>Create new Blog</h3>
            <form onSubmit = {addBlog}>
                title: <input name = 'title'/>
                author: <input name = 'author'/>
                url: <input name = 'url'/>
                <button type = 'submit'>create</button>
            </form>
        </div>
    )
}


export default connect(
    null,
    { createBlog, showNotification }
)(BlogForm)