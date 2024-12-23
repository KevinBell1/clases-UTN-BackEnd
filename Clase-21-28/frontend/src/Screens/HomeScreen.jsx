import React, { useContext, useEffect } from 'react'
import useProducts from '../Hooks/useProducts'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
const HomeScreen = () => {
    const { products_state, products_loading_state, products_error_state } = useProducts()
    // Necesito el is_authenticated_state para saber si el usuario esta autenticado o no
    const object = useContext(AuthContext) 
    console.log(object)
    return (
        <div>
            <h1>Bienvenido a Brand name</h1>
            <div>
                {
                    products_loading_state
                        ? <span>Cargando</span>
                        : (
                            products_error_state
                                ? <span>{products_error_state}</span>
                                : <div>
                                    {
                                        products_state.map(product => (
                                            <div key={product._id}>
                                                <h3>{product.title}</h3>
                                                <p>{product.description}</p>
                                                <Link to={`/product/${product._id}`}>Ver detalle</Link>
                                            </div>
                                        ))
                                    }
                                </div>
                        )
                }
            </div>
        </div>
    )
}

export default HomeScreen