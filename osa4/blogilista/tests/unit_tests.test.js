const listHelper = require('../utils/list_helper')

const listwithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]
const listwithTwoBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement Considered Harmful 2',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful2.html',
        likes: 20,
        __v: 0
    }
]
const manyBlogs = [
    {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement Considered Harmful 2',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful2.html',
        likes: 20,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f91',
        title: 'book1',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful2.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f92',
        title: 'BestBook',
        author: 'juho',
        url: 'http://www.u.arizona.edu/',
        likes: 100,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f93',
        title: 'bestbook part 2',
        author: 'juho',
        url: 'http://www.u.arizona.edu',
        likes: 2,
        __v: 0
    },

    {
        _id: '5a422aa71b54a676234d17f94',
        title: 'bestbook part 3',
        author: 'juho',
        url: 'http://www.u.arizona.edu',
        likes: 5,
        __v: 0
    },

    {
        _id: '5a422aa71b54a676234d17f95',
        title: 'not good book',
        author: 'jooseppi',
        url: 'http://www.jotakin.fi',
        likes: 0,
        __v: 0
    },



]

test('Dummy return one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('array of an empty list returns 0', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
    test('array of an one blog returns its likes', () => {
        const result = listHelper.totalLikes(listwithOneBlog)
        expect(result).toBe(5)
    })
    test('array of two blogs returns the sum of the likes', () => {
        const result = listHelper.totalLikes(listwithTwoBlogs)
        expect(result).toBe(25)
    })

})

describe('Favourite blog', () => {
    test('array of 2 blogs return the most liked one', () => {
        const result = listHelper.favoriteBlog(listwithTwoBlogs)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful 2',
            author: 'Edsger W. Dijkstra',
            likes: 20
        })
    })
    test('array manyblogs returns the most liked on', () => {
        const result = listHelper.favoriteBlog(manyBlogs)
        expect(result).toEqual({
            title: 'BestBook',
            author: 'juho',
            likes: 100
        })
    })
})

describe('Most blogs', () => {
    test('author who has written most blogs in array manyBlogs is returned', () => {
        const result = listHelper.mostBlogs(manyBlogs)
        expect(result).toEqual({
            author: 'juho',
            blogs: 3
        })
    })
})

describe('Most likes', () => {
    test('author whos blogs has most likes combined is receveid when give array manyblogs', () => {
        const result = listHelper.mostLikes(manyBlogs)
        expect(result).toEqual({
            author: 'juho',
            likes: 107
        })
    })
})
