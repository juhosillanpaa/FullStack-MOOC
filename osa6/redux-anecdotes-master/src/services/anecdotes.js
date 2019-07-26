import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const createNew = async (content) => {
    const obj = {content, votes: 0}
    const res = await axios.post(baseUrl, obj)
    return res.data
}

const update = (id, newObject) => {
    const res = axios.put(`${baseUrl}/${id}`, newObject)
    return res.then(response => response.data)
}


export default { getAll, createNew, update }