import { configureStore } from '@reduxjs/toolkit'
// importamos el authSlice
import auth from '../redux/auth/authSlice'
import posts from '../redux/posts/postsSlice'

export const store = configureStore({
    // lo pasamos por aquí
    reducer: {
        auth,
        posts
    },
})   