import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider> {/* ahora todo lo que haya en authProvider va a estar disponible en toda la app */}
            <App />
        </AuthProvider>
    </BrowserRouter>
)
