import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
    addNewBlog,
    newTitle,
    newAuthor,
    newUrl,
}) => {

    return (
        <form onSubmit = {addNewBlog}>
            <div>
                title
                <input { ...newTitle.bind }/>
            </div>
            <div>
                author
                <input { ...newAuthor.bind }/>
            </div>
            <div>
                url
                <input { ...newUrl.bind }/>
            </div>
            <button type="submit">create</button>
        </form>
    )
}

BlogForm.propTypes = {
    addNewBlog: PropTypes.func.isRequired,
    newTitle: PropTypes.object.isRequired,
    newAuthor: PropTypes.object.isRequired,
    newUrl: PropTypes.object.isRequired
}

export default BlogForm