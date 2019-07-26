import React from 'react'
import { connect } from 'react-redux'

const SingleUser = ( props ) => {
    const writedBlogs = props.blogs.filter(blog => blog.user.id === props.id)


    console.log(props.id)
    return (
        <div>
            <h1>{writedBlogs[0].user.name}</h1>
            <h3>added blogs</h3>
            <ul>
                {writedBlogs.map(blog =>
                    <li key = {blog.id} >
                        {blog.title}
                    </li>)}
            </ul>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
    }
}
export default connect(
    mapStateToProps
)(SingleUser)