import { useEffect, useState } from "react"
import getAuthenticateHeaders from "../utils/fetching"


const useProductsDetail = (product_id) =>{
    const [product_detail_state,setProductDetail] = useState()
    const [product_detail_loading_state,setProductDetailLoading] = useState(true)
    const [product_detail_error_state, setProductDetailError] = useState(null)

    const getProductDetail = async (product_id) =>{ 
        const response = await fetch(`http://localhost:3000/api/products/${product_id}`,
            {
                method: 'GET',
                headers: getAuthenticateHeaders()
            }
        )
        const data = await response.json()
        if(!data){
            setProductDetailError(data.error)
            return 
        }else{
            setProductDetail(data.product)
        }
        setProductDetailLoading(false)
    }
    useEffect(
            () => {
                getProductDetail(product_id)
            },
            []
        )
        return {
            product_detail_state,
            product_detail_loading_state,
            product_detail_error_state
        }
}

export default useProductsDetail
