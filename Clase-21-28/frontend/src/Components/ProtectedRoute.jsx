import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

const ProtectedRoute = () => {
    const {is_authenticated_state} = useContext(AuthContext)
    
    return (
            is_authenticated_state
            ? <Outlet/> //similar al next en un middleware
            :<Navigate to={'/login'}/> //similar a un redirect
    )
}

export default ProtectedRoute