import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/auth/authSlice'

const TheHeader = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // nos traemos al usuario del estado
    const { user } = useSelector((state) => state.auth)

    const onLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
        navigate('/login')
    }

    // en el header creamos un enlace para la ruta del perfil 
    // que se llamará con el nombre del usuario logueado

    // Sacamos el link de home para que se vea siempre
    // moverlo hacia arriba
    return (
        <nav>
            <Link to="/">Home</Link>
            <h1>header</h1>
            {user ? (
                <>
                    <button onClick={onLogout}>Logout</button>
                    <Link to="/profile">Profile | {user.name}</Link>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    )

}

export default TheHeader