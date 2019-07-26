const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    console.log('Attempting to login')
    console.log(`username: ${body.username} and password: ${body.password}`)
    
    const user = await User.findOne({ username: body.username })
    console.log(`found user ${user}`)

    
    const passwordCorrect = user === null
        ? false
        : await bcryptjs.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        console.log('failed, invalid username/password')
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }else {
        console.log('password was correct')
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    response
        .status(200)
        .send({ token, username: user.username, name: user.name, id: user._id, })
})

module.exports = loginRouter