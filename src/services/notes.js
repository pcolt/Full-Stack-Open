import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/notes' // back-end build locally using nodejs or json-server
//const baseUrl = 'https://secure-ridge-67129.herokuapp.com/api/notes' // back-end build locally using nodejs or json-server
const baseUrl = '/api/notes'											// front-end and back-end on heroku

const getAll = () => {
    //return axios.get(baseUrl)
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default {
    getAll: getAll
}