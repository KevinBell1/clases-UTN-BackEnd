import React from 'react'
import { NavBar } from '../Components'
import { useGlobalContext } from '../Context/GlobalContext'


const Carrito = () => {
    const valores = useGlobalContext()
    console.log(valores)
    return (
        <>
            <NavBar/>
            <h1>Carrito</h1>
        </>
    )
}

export default Carrito