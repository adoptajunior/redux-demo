// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// Importamos Provider en el main.jsx 
// para que todos los componentes de la aplicación tengan acceso 
// y puedan escuchar los estados del store.
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import './index.css'

// Provider tiene una prop que se llama store, 
// donde le pasaremos como valor lo que contenga desde nuestra store. 
// Por lo tanto tendremos que importarlo también.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
