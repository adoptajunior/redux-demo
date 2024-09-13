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

// const userStorage = JSON.parse(localStorage.getItem('user'))
// const tokenStorage = JSON.parse(localStorage.getItem('token'))

// !!! CAMBIA DE NOMBRE ENTRE DIAPOSITIVAS 
// REDUX LOGIN vs REDUX LOGOUT
const user = JSON.parse(localStorage.getItem('user'))
const token = JSON.parse(localStorage.getItem('token'))

/*
En nuestro estado inicial añadimos lo siguiente:
isError: con un estado inicial false.
isSucces: con un estado inicial false.
message: con un estado inicial de string vacía.
Los siguientes estados iniciales irán variando en función de lo que necesitemos.
*/

const initialState = {
    user: user || null,
    token: token || null,
    isError: false,
    isSuccess: false,
    message: '',
}

// const initialState = {
//     user: userStorage ? userStorage : null,
//     token: tokenStorage ? tokenStorage : null,
// }

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

/*
Para personalizar el contenido de la acción rechazada (rejected), 
deberemos detectar cualquier error y luego devolver un nuevo valor 
utilizando la utilidad thunkAPI.rejectWithValue. 
Devolver el rechazo con valor (errorPayload) hará que 
la acción rechazada use ese valor como action.payload
*/
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = error.response.data.errors.map(
            (error) => `${error.msg} | `
        )
        return thunkAPI.rejectWithValue(message)
    }
}
)


// Actualizamos el slice, creando la acción Login para llamar al servicio 
// que se encargará de loguear al usuario en la base de datos.
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = error.response.data.error
        return thunkAPI.rejectWithValue(message)
    }
})

// Actualizamos nuestra acción y le decimos que llame al servicio 
// que se encargará de desloguear al usuario en la base de datos
export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        return await authService.logout()
    } catch (error) {
        console.error(error)
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Ahora crearemos un reducer que lo que hará es 
        // resetear los estados a como estaban inicialmente
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },
    // extraReducers permite que createSlice responda 
    // a otros tipos de acciones además de los tipos que ha generado.
    // Si el login es exitoso(fullfilled), guardamos el usuario en el estado.

    /*
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.token = null
            })
            // Ahora en el caso de que el registro sea exitoso, 
            // le decimos que isSuccess pase a ser true y que 
            // el mensaje será lo que devuelva el action.payload
            .addCase(register.fulfilled, (state, action) => {
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(register.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
                */

    // Login & Logout extraReducers
    // penúltima diapositiva día 2 (redux logout)
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.token = null
            })
    },
})

export const { reset } = authSlice.actions

export default authSlice.reducer
