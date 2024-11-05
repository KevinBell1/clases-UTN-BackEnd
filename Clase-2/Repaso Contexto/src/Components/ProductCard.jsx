import React from 'react'
import { Link } from 'react-router-dom'

export const ProductCard = ({nombre, id, precio, imagen}) => {
    return(
        <div>
            <h2>{nombre}</h2>
            <img src={imagen} alt={nombre} />
            <span>{precio}</span>
            <Link to={'/detail/' + id}>Ver detalles</Link>
            <hr />
        </div>
    )
}
