
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')


describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const response = await api.get('/api/users')
        const usersAtStart = response.body

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response2 = await api.get('/api/users')
        expect(response2.body.length).toBe(usersAtStart.length + 1)

        const usernames = response2.body.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creating with too short username doesnt succeed', async () => {
        const response = await api.get('/api/users')
        const usersAtStart = response.body
        const newUser = {
            username: 'J',
            name: 'juho',
            password: 'tosisalainen',
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(result.body.error).toContain('is shorter than the minimum allowed length')
        const response2 = await api.get('/api/users')
        expect(response2.body.length).toBe(usersAtStart.length )

        const usernames = response2.body.map(u => u.username)
        expect(usernames).not.toContain(newUser.username)
    })

    test('creating with too short password doesnt succeed', async () => {
        const response = await api.get('/api/users')
        const usersAtStart = response.body
        const newUser = {
            username: 'Juhoonparas',
            name: 'juho',
            password: '12',
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(result.body.error).toContain('password is too short')
        const response2 = await api.get('/api/users')
        expect(response2.body.length).toBe(usersAtStart.length )

        const usernames = response2.body.map(u => u.username)
        expect(usernames).not.toContain(newUser.username)
    })

    test('creating with non-unique username doesnt succeed', async () => {
        const response = await api.get('/api/users')
        const usersAtStart = response.body
        const newUser = {
            username: 'root',
            name: 'juho',
            password: '121212',
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(result.body.error).toContain('expected `username` to be unique')
        const response2 = await api.get('/api/users')
        expect(response2.body.length).toBe(usersAtStart.length )
    })
})



afterAll(() => {
    mongoose.connection.close()
})