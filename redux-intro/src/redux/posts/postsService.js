// Creamos nuestro servicio de posts 
// que se encargará de hacer las peticiones a la base de datos. 

import axios from "axios"
const API_URL = "http://localhost:3001"

const getAll = async () => {
    const res = await axios.get(API_URL + "/posts")
    return res.data
}

const getById = async (id) => {
    const res = await axios.get(API_URL + "/posts/" + id)
    return res.data
}

const authService = {
    getAll,
    getById
}

export default authService