// Creamos el servicio authService para hacer la petición axios al backend que registrará el usuario.
// >>> ! Instalamos axios: $ npm i axios !

import axios from 'axios'

const API_URL = 'http://localhost:3000'

const register = async (userData) => {
    const res = await axios.post(`${API_URL}/users`, userData)
    return res.data
}

// Actualizamos el servicio con una nueva función 
// que hará la petición axios al backend para loguear el usuario.
const login = async (userData) => {
    const res = await axios.post(`${API_URL}/users/login`, userData)
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data.user))
        localStorage.setItem('token', JSON.stringify(res.data.token))
    }
    return res.data
}


const authService = {
    register, login,
}

export default authService