// Es una función que acepta:
// Un nombre de slice (fragmento)
// Un estado inicial para el reductor
// un objeto con reducers
// Esta API es el enfoque estándar para escribir la lógica de Redux.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import authService from './authService'

// El estado de Redux no es persistente si recargamos la página,
// por lo que el usuario ya no estaría logueado y tendría que volver a iniciar sesión.
// En nuestro estado inicial añadimos un ternario que haga lo siguiente: 
// si hay usuario (hay un usuario guardado en el localStorage) devolvemos ese usuario 
// y sino devolvemos null

const userStorage = JSON.parse(localStorage.getItem('user'))
const tokenStorage = JSON.parse(localStorage.getItem('token'))

const initialState = {
    user: userStorage ? userStorage : null,
    token: tokenStorage ? tokenStorage : null,
}

// const initialState = {
//     user: null,
//     token: null,
// }

// createAsyncThunk  crea automáticamente un generador de acciones 
// para cada estado de una promesa. De esta forma podremos controlar 
// cada estado de la promesa (pending, rejected o success) 
// para, por ejemplo, incluir un loading en estado pendiente.

// export const register = createAsyncThunk('auth/register', async (user) => {
//     console.log('desde store', user)
// })

export const register = createAsyncThunk('auth/register',
    async (userData) => {
        try {
            return await authService.register(userData)
        } catch (error) {
            console.error(error)
        }
    })

// Actualizamos el slice, creando la acción Login para llamar al servicio 
// que se encargará de loguear al usuario en la base de datos.
export const login = createAsyncThunk('auth/login', async (user) => {
    try {
        return await authService.login(user)
    } catch (error) {
        console.error(error)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    rreducers: {},
    // extraReducers permite que createSlice responda 
    // a otros tipos de acciones además de los tipos que ha generado.
    // Si el login es exitoso(fullfilled), guardamos el usuario en el estado.
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        })
    },
})

export default authSlice.reducer
