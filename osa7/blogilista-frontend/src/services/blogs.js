import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    //console.log(`in service/blogs about to return: ${response.data}` )
    return response.data
}

const comment = async (id, newComment) => {
    /*const config = {
        headers: { Authorization: token },
    }*/
    const response  = await axios.post(`${baseUrl}/${id}/comments`, newComment/*, config*/)
    return response.data
}


const update = (id, newObject) => {
    const request = axios.put(`${ baseUrl }/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteBlog = (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.delete(`${baseUrl}/${id}`, config)
    return request.then(response => response.data)
}


export default { getAll, create, setToken, update, deleteBlog, comment }