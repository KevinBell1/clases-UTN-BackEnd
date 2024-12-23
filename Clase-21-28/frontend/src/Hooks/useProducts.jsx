import { useEffect, useState } from "react"
import getAuthenticateHeaders from "../utils/fetching.js"

const useProducts = () => {
    const [products_state, setProducts] = useState([])
    const [producs_loading_state, setProducsLoading] = useState(true)
    const [producs_error_state, setProductsError]= useState(null)

    const obtenerProductos = async () => { // emite el fecth, transforma la info a json
        const response = await fetch('http://localhost:3000/api/products',{
            method: 'GET',
            headers: getAuthenticateHeaders()
        })
        const data = await response.json()
        console.log(data.products)
        if(!data){
            setProductsError(data.error)
            setProducsLoading(false)
            return 
        }else{
            setProducts(data.products)
            setProducsLoading(false)
        }
    }
    useEffect(
        () => {
            obtenerProductos()
        },
        []
    )
    return {
        products_state,
        producs_loading_state,
        producs_error_state
    }
}
export default useProducts