import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    //return axios.get(baseUrl)
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default {
    getAll: getAll
}