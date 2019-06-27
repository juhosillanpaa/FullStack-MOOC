const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Kirja Nro 1',
        author: 'kirjailija',
        url: 'www.jotakin.fi',
        likes: 10
    },
    {
        title: 'Kirja Nro 2',
        author: 'kirjalija',
        url: 'www.jotakin.fi/2',
        likes: 6
    },
    {
        title: 'Vitsejä',
        author: 'koomikko',
        url: 'www.jotakin.fi/vitsit',
        likes: 20
    }
]
beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('GET requests', () => {
    test('GET request return correct amount of blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length)
    })

    test('GET request returns content in json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Blog identifier is called id, not _id', async () => {
        const response = await api.get('/api/blogs')
        const first = response.body[0]
        expect(first.id).toBeDefined()
    })
})

describe('POST requests', () =>  {
    test('POST increases length of array and a blog with corrrect body is appended', async () => {
        const newBlog = {
            title: 'Tietokirja',
            author: 'tutkija',
            url: 'www.jotakin.fi/faktat',
            likes: 1
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)
        expect(response.body.length).toBe(initialBlogs.length + 1)
        expect(titles).toContain('Tietokirja')
    })

    test('POST: likes without value is set to zero and blog is added otherwise correctly', async () => {
        const newBlog = {
            title: 'Testikirja',
            author: 'huolimaton',
            url: 'www.jotakin.fi/faktat'
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)
        expect(response.body.length).toBe(initialBlogs.length + 1)
        expect(titles).toContain('Testikirja')
        expect(response.body[response.body.length -1].likes).toBe(0)
    })

    test('POST: if title and url are not included then response status us 400 bad request', async () => {
        const newBlog = {
            author: 'huolimaton',
            likes: 20
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length)
    })
})
describe('DELETE AND PUT requests', () => {
    test('DELETE: deleting existing node works', async () => {
        const data = await api.get('/api/blogs')
        const id = data.body[1].id
        await api
            .delete(`/api/blogs/${id}`)
            .expect(204)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length - 1)
        const titles = response.body.map(r => r.title)
        expect(titles).not.toContain(data.body[1].title)
    })
    test('DELETE: deleting inexisting node return error', async () => {
        const id = 'not going to work'
        await api
            .delete(`/api/blogs/${id}`)
            .expect(400)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length)
    })

    test('PUT: updating existing node works', async () => {
        const data = await api.get('/api/blogs')
        const id = data.body[0].id
        const updatedBlog = {
            title: 'Parempi',
            author: 'kirjailija',
            url: 'www.jotakin.fi',
            likes: 10
        }

        await api
            .put(`/api/blogs/${id}`)
            .send(updatedBlog)
            .expect(200)

        const response = await api.get('/api/blogs')
        expect(response.body[0].title).toBe('Parempi')
    })

    test('PUT: updating inexisting node doesnt work', async () => {
        const id = 'not working id'
        const updatedBlog = {
            title: 'Parempi',
            author: 'kirjailija',
            url: 'www.jotakin.fi',
            likes: 10
        }
        await api
            .put(`/api/blogs/${id}`)
            .send(updatedBlog)
            .expect(400)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)
        expect(titles).not.toContain('Parempi')
    })
})



afterAll(() => {
    mongoose.connection.close()
})