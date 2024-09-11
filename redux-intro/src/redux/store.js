import { configureStore } from '@reduxjs/toolkit'
// importamos el authSlice
import auth from '../redux/auth/authSlice'


export const store = configureStore({
    // lo pasamos por aquí
    reducer: { auth }
})   