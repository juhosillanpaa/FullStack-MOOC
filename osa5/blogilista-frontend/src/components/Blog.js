import React, { useState } from 'react'
import blogService from '../services/blogs'


const handleLikeButtonPress = async (blog, e, setLikes) => {
    e.stopPropagation()
    const test = {
        author: blog.author,
        likes: blog.likes +1,
        title: blog.title,
        url: blog.url
    }
    try {
        await blogService.update(blog.id, test)
        setLikes(test.likes)
    } catch (exception) {
        console.log(exception)
    }
}
const deleteBlog = async (blog, e) => {
    e.stopPropagation()
    console.log('wants to delete')
    if (window.confirm(`Remove blog: ${blog.title}`)){
        try {
            await blogService.deleteBlog(blog.id)
            const thisBlog = document.getElementById(blog.id)
            thisBlog.parentNode.removeChild(thisBlog)
        } catch (exception) {
            console.log(exception)
        }
    }
}

const Blog = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const [visible, setVisible ] = useState(false)
    const [isOwner, setOwnerTrue ] = useState(false)
    const [likes, setLikes ] = useState(blog.likes)

    const showWhenVisible = { display: visible ? '':'none' }
    const visibleOnlyForOwner = { display: isOwner ? '' :'none' }

    const toggleVisibility = async () => {
        setVisible(!visible)
        if (!visible) {
            const currentUserId = JSON.parse(window.localStorage.getItem('loggedBloglistUser')).id
            if (currentUserId === blog.user.id) {
                setOwnerTrue(true)
            }
        }
    }

    return (
        <div style = {blogStyle} onClick = {toggleVisibility} id = {blog.id} className = 'blog'>
            {blog.title} {blog.author}
            <div style = {showWhenVisible} className = "togglableContent" >
                <p>{blog.url}</p>
                <p>{likes} <button onClick = {(e) => handleLikeButtonPress( blog, e , setLikes)}>like</button></p>
                <p>Added by {blog.author}</p>
                <button style = {visibleOnlyForOwner} onClick= {(e) => deleteBlog( blog, e )}>delete</button>
            </div>
        </div>
    )
}

export default Blog