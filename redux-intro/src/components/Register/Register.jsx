import { useState } from 'react'
// Importamos useDispatch() de redux 
import { useDispatch } from 'react-redux'
// y la acción register que hemos creado antes.
import { register } from '../../redux/auth/authSlice'
import { notification } from 'antd'

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    const { firstName, username, email, password, password2 } = formData

    // inicializamos dispatch
    const dispatch = useDispatch()

    // DIA 2: LOGOUT
    // Traemos del estado auth los estados isSuccess y message.
    // En el useEffect() si isSuccess  cambia, mostrará una notificación de éxito 
    // y el mensaje que devuelva el back
    const { isSuccess, message, isError } = useSelector((state) => state.auth)
    useEffect(() => {
        if (isSuccess) {
            notification.success({
                message: 'Success',
                description: message,
            })
        }
        if (isError) {
            notification.error({ message: 'Error', description: message })
        }

        // Cada vez que se ejecute useEffect despachamos la acción de reset que importamos del authSlice
        dispatch(reset())
    }, [isSuccess, isError, message])


    const onChange = (e) => {
        const { name, value } = e.target
        // componente local
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            return notification.error({
                message: 'Error',
                description: 'Passwords does not match',
            })
        } else {
            notification.success({
                message: 'Success',
                description: 'User registered!',
            })
            return dispatch(register(formData))
        }
    }


    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="firstName" value={firstName} onChange={onChange} />
            <input type="text" name="username" value={username} onChange={onChange} />
            <input type="email" name="email" value={email} onChange={onChange} />
            <input type="password" name="password" value={password} onChange={onChange} />
            <input type="password" name="password2" value={password2} onChange={onChange} />
            <button type="submit">Register</button>
        </form>
    )
}

export default Register