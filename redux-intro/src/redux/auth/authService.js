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

// Definimos nuestro servicio que hará la petición axios al backend 
// que deslogueará al usuario
const logout = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const res = await axios.delete(`${API_URL}/users/logout`, {
        // pasamos el token por headers en la petición axios
        headers: {
            authorization: token,
        }
    })
    // borramos al usuario del localStorage
    if (res.data) localStorage.clear()
    return res.data
}

const authService = {
    register, login, logout,
}

export default authService