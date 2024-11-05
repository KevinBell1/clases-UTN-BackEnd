import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <header>
            <h2>Brand name</h2>
            <nav>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/carrito'}>Carrito</NavLink>
                <NavLink to={'/error404'}></NavLink>
            </nav>
        </header>
    )
}

export default NavBar