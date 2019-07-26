import React from 'react'
import blogService from '../services/blogs'
import '../index.css'
import { Link } from 'react-router-dom'



const handleLikeButtonPress = (e, handleLikeClick) => {
    e.stopPropagation()
    handleLikeClick()
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
const toggleVisibility = ( id ) => {
    console.log(id)
    return
    /*
    const element = document.getElementById(`${id}child`)
    console.log(element.style.display)
    if (!element.style.display) {
        element.style.display = 'block'
    }else {
        element.style.display = ''
    }*/

}

const Blog = ({ blog, handleLikeClick, loggedUser }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const buttonStyle = {
        display: 'none'
    }
    console.log(blog.user.id)
    if (loggedUser.id === blog.user.id) {
        buttonStyle.display = 'block'
    }



    return (
        <div style = {blogStyle} onClick = {() => toggleVisibility(blog.id)}  id = {blog.id} className = 'blog'>
            <div className = "textContainer">
                <Link className = "blogItem" to = {`/blogs/${blog.id}`}>{blog.title}</Link>
                <div className = "blogItem">
                    {blog.author}
                </div>
            </div>

            <div className = "notDisplayed" id = {`${blog.id}child`} >
                <p>{blog.url}</p>
                <p>{blog.likes} <button onClick = {(e) => handleLikeButtonPress( e , handleLikeClick )}>like</button></p>
                <p>Added by {blog.author}</p>
                <button style = {buttonStyle} onClick= {(e) => deleteBlog( blog, e )}>delete</button>
            </div>
        </div>
    )
}


export default Blog