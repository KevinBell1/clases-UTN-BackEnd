import React from 'react'
import { useParams } from 'react-router-dom'
import useProductsDetail from '../Hooks/useProductDetail'

const ProductDetailScreen = () => {
    const {product_id} = useParams()
    const {product_detail_state, product_detail_loading_state, product_detail_error_state} = useProductsDetail(product_id)
    return (
        <div>
            {
                product_detail_loading_state
                ?<span>Cargando...</span>
                :<div>
                    <h1>{product_detail_state.title}</h1>
                    <p>{product_detail_state.description}</p>
                </div>
            }
        </div>
    )
}

export default ProductDetailScreen