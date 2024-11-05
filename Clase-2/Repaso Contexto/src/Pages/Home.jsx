import React from 'react'
import { NavBar, ProductsList } from '../Components'
import { productos } from '../data/productos'

const Home = () => {
    return (
    <>
        <NavBar/>
        <h1>Bienvenido</h1>
        <ProductsList products={ productos }/>
    </>

    )
}

export default Home