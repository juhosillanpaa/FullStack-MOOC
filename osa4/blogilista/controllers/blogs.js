const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user',{ username: 1, name: 1, id: 1 })
    console.log(blogs)
    response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id,  //check is this should be id or _id
            comments: []
        })

        const savedBlog = await blog.save()
        // check if it should be _id or id
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
        response.json(savedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
    const body = request.body
    console.log(body)
    try{
        /*
        const comment = {
            comment: body.text
        }
        
        console.log(`We think you commented this ${blog}`)
        console.log(`comment: ${comment}`)
        const savedComment = await comment.save()
        console.log(`savedcomment: ${savedComment}`)
        */
        const blog = await Blog.findById(request.params.id)
        blog.comments = blog.comments.concat(body.text)
        await blog.save()
        response.json(body.text)
    } catch (exception) {
        console.log('something went wrong')
        next(exception)
    }
})


blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const note = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        comments: body.comments
    }
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, note, { new: true })
        response.json(updatedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})


blogsRouter.delete('/:id', async (request, response, next) => {

    try {
        const deletingToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !deletingToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const deletingUser = await User.findById(deletingToken.id)
        const deletingUserId = deletingUser._id.toString()

        const blog = await Blog.findById(request.params.id)

        if (blog.user.toString() === deletingUserId) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            return response.status(401).json({
                error: 'Only the user who added the blog is allowed to delete it'
            })
        }
    } catch( exception) {
        next(exception)
    }
})

module.exports = blogsRouter