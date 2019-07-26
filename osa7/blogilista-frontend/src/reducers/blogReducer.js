import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    console.log('state now', state)
    console.log(`action ${action}`)
    switch (action.type) {
    case 'NEW_BLOG':
        return [...state, action.data]
    case 'INIT_BLOGS':
        console.log(`initialize blogs action data ${action.data}`)
        return action.data
    case 'LIKE':
        return state.map(b =>
            b.id !== action.data.id ? b : action.data
        )
    case 'DEFAULT_COMMENT':
        return state.map(b =>
            b.id !== action.data.id ? b : action.data)
    case 'CUSTOM_COMMENT':
        return state.map(b =>
            b.id !== action.data.id ? b : action.data)
    default:
        return state
    }
}

export const likeBlog = (blog) => {
    const newObj = {
        ...blog,
        likes: blog.likes + 1
    }
    return async dispatch => {
        await blogService.update(blog.id, newObj)
        dispatch({
            type: 'LIKE',
            data: newObj,
        })
    }
}

export const defaultComment = ( blog ) => {
    console.log('in reducer:')
    console.log(blog.title)
    const newComment = 'I havent read this yet'

    const updatedComments = blog.comments.concat(newComment)

    const newObj = {
        ...blog,
        comments: updatedComments
    }
    console.log('newobj',newObj)

    return async dispatch => {
        await blogService.comment(blog.id, newComment)
        dispatch({
            type: 'DEFAULT_COMMENT',
            data: newObj
        })
    }
}

export const customComment = (blog) => {
    const comment = blog.comments[blog.comments.length -1]
    return async dispatch => {
        await blogService.comment(blog.id, comment)
        dispatch({
            type: 'CUSTOM_COMMENT',
            data: blog
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}
export const createBlog = newObj => {
    return async dispatch => {
        const newBlog = await blogService.create(newObj)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export default blogReducer