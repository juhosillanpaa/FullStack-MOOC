import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const BlogList = (props) => {
    return (
        <div>
            {props.blogs.map(blog =>
                <Blog
                    key = {blog.id}
                    blog = {blog}
                    handleLikeClick = {() => {
                        props.likeBlog(blog)
                        props.showNotification(`You voted '${blog.title}'`, 5)
                    }}
                    loggedUser = {props.loggedUser}
                />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        loggedUser: state.loggedUser,
    }
}
const mapDispatchToProps = {
    likeBlog,
    showNotification,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogList)