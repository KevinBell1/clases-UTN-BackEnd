import React from 'react'
import { useParams } from 'react-router-dom'
import { buscadorProducto } from '../data/productos'
import { NavBar } from '../Components'
import { useGlobalContext } from '../Context/GlobalContext'

const Detail = () => {
    const {pid} = useParams()
    const producto = buscadorProducto(pid)
    const {agregarProductoAlCarrito} = useGlobalContext()
    return (
        <div>
            <NavBar/>
            <h1>{producto.nombre}</h1>
            <img src={producto.imagen} alt={producto.nombre} />
            <button onClick={() => agregarProductoAlCarrito()}>Comprar</button>
        </div>
    )
}

export default Detail