import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    console.log('loginservice and about to sen request to backend')
    const response = await axios.post(baseUrl, credentials)
    console.log(response.data)
    return response.data
}


export default { login }