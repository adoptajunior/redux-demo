import { Navigate } from "react-router-dom";

// pasamos la propiedad children como valor
// representan componentes que queremos sean accesibles
const PrivateZone = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
};
// Añadimos la nueva opción para acceder a la ruta del profile en App.jsx

export default PrivateZone;
