import React from 'react'

import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { likeBlog, defaultComment, customComment } from '../reducers/blogReducer'


const SingleBlog = ( props ) => {
    console.log('in singleBLog')
    console.log(props)
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
    const comment = (e) => {
        e.preventDefault()
        const comment = e.target.text.value
        const newComments = props.blog.comments.concat(comment)
        const temp = {
            ...props.blog,
            comments: newComments
        }
        props.customComment(temp)
        e.target.text.value = ''
        props.showNotification('New comment added', 5)
    }
    const rows = () => props.blog.comments.map(comment =>
        <div key = {Math.floor(Math.random()*1000000)}>{comment}</div>
    )

    return (
        <div>
            <h1>{props.blog.title}, {props.blog.author}</h1>
            <p>{props.blog.url}</p>
            <p>{props.blog.likes} likes </p><button onClick = {handleLikeClick}>like</button>
            <p>added by {props.blog.user.name}</p>
            <h3>comments</h3>
            {rows()}

            <button onClick = {() => defaultCommentButton()}>havent read this yet..</button>
            <form onSubmit = {comment}>
                text: <input name = 'text'/>
                <button type = 'submit'>add comment</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    likeBlog,
    showNotification,
    defaultComment,
    customComment
}
export default connect(
    null, mapDispatchToProps
)(SingleBlog)
