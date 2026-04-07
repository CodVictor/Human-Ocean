import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/index.css' // <--- ESTA ES LA LÍNEA MÁS IMPORTANTE

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    )