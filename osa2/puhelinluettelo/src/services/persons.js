import axios from 'axios'

const baseUrl = '/api/persons'
//const baseUrl = 'https://backend-demo.herokuapp.com/api/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const update = (id, newObject ) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(console.log("done"))
}

const create = (newObject) =>{
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}
export default {
    getAll,
    update,
    create,
    deletePerson
}