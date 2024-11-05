import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import GlobalContextProvider from './Context/GlobalContext'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <GlobalContextProvider>
            <App />
        </GlobalContextProvider>
    </BrowserRouter>

)
