const blogs = [
    {
        id: '100100blogi1',
        author: 'Blogger',
        title: 'Blogi 1',
        url: 'www.blogit.fi',
        likes: 21,
        user: {
            id: '200200user1',
            username: 'blogger_kalle',
            name: 'kalle'
        }
    },
    {
        id: '100100blogi2',
        author: 'Kirjailija',
        title: 'Kirja 1',
        url: 'www.kirjat.fi',
        likes: 1,
        user: {
            id: '200200user2',
            username: 'kirjailija_anssi',
            name: 'anssi'
        }
    },
    {
        id: '100100blogi3',
        author: 'helppoheikki',
        title: 'Huuhaa 1',
        url: 'www.blogit.fi',
        likes: 211,
        user: {
            id: '200200user3',
            username: 'helppoheikki_janne',
            name: 'janne'
        }
    }
]

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}
const getAll = () => {
    return Promise.resolve(blogs)
}




export default { getAll, setToken }