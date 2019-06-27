const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const arrSum = blogs.reduce((a,b) => a + b.likes, 0)
    return arrSum
}
const favoriteBlog = (blogs) => {
    const tblogs = blogs.map(value => value.likes)
    const i = tblogs.indexOf(Math.max(...tblogs))

    const temp = {
        title: blogs[i].title,
        author:blogs[i].author,
        likes: blogs[i].likes
    }
    return temp
}

const mostBlogs = (blogs) => {
    let keys = []
    let listOfAuthorsInKeys = []
    blogs.forEach((obj) => {
        const item = obj.author
        if (listOfAuthorsInKeys.includes(String(item))) {
            const i = listOfAuthorsInKeys.indexOf(item)
            keys[i].blogs += 1
        }
        else {
            keys = keys.concat({
                author: item,
                blogs: 1
            })
            listOfAuthorsInKeys = listOfAuthorsInKeys.concat(String(item))
        }
    })
    const keysWithOnlyBlogs = keys.map(o => o.blogs)
    const indexOfBest = keysWithOnlyBlogs.indexOf(Math.max(...keysWithOnlyBlogs))
    const temp = {
        author: keys[indexOfBest].author,
        blogs: keys[indexOfBest].blogs
    }
    return temp
}
const mostLikes = (blogs) => {
    let keys = []
    let listOfAuthorsInKeys = []
    blogs.forEach((obj) => {
        const item = obj.author
        if (listOfAuthorsInKeys.includes(String(item))) {
            const i = listOfAuthorsInKeys.indexOf(item)
            keys[i].likes += obj.likes
        }
        else {
            keys = keys.concat({
                author: item,
                likes: obj.likes
            })
            listOfAuthorsInKeys = listOfAuthorsInKeys.concat(String(item))
        }
    })
    const keysWithOnlyLikes = keys.map(o => o.likes)
    const indexOfBest = keysWithOnlyLikes.indexOf(Math.max(...keysWithOnlyLikes))   
    const temp = {
        author: keys[indexOfBest].author,
        likes: keys[indexOfBest].likes
    }
    return temp
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}