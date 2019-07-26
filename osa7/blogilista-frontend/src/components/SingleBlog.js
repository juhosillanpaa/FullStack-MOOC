import React from 'react'

import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { likeBlog, defaultComment } from '../reducers/blogReducer'


const SingleBlog = ( props ) => {
    if (props.blog === undefined) {
        return null
    }
    const handleLikeClick = () => {
        props.likeBlog(props.blog)
        props.showNotification(`You voted '${props.blog.title}'`, 5)
    }
    const defaultCommentButton = () => {
        props.defaultComment(props.blog)
        props.showNotification(`You commented blog ${props.blog.title}`, 5)
    }


    return (
        <div>
            <h1>{props.blog.title}, {props.blog.author}</h1>
            <p>{props.blog.url}</p>
            <p>{props.blog.likes} likes </p><button onClick = {handleLikeClick}>like</button>
            <p>added by {props.blog.user.name}</p>
            <h3>comments</h3>
            <button onClick = {defaultCommentButton()}>havent read this yet..</button> <button>add comment</button>
        </div>
    )
}

const mapDispatchToProps = {
    likeBlog,
    showNotification,
    defaultComment,
}
export default connect(
    null, mapDispatchToProps
)(SingleBlog)
