import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext()

const GlobalContextProvider = (props) =>{
    const [carrito, setCarrito] = useState([])
    const buscarProductoPorId = (id) => {
        return (
            carrito.find(item => item.id == id)        
        )
    }


    const agregarProductoAlCarrito =(producto) =>
        {
            if(buscarProductoPorId(producto.id)){
                setCarrito((prevCarrito) => {
                    const newCarrito = prevCarrito.map(item => {
                        if(item.id == producto.id){
                            item.cantidad == item.cantidad + 1
                        }
                        return item
                    })
                    return newCarrito
                })
            }
            else{
                setCarrito((prevCarrito) => [...prevCarrito, {...producto, cantidad: 1}])
                
            }
        }


    return( 
        <GlobalContext.Provider value={
                {
                    carrito: carrito, 
                    agregarProductoAlCarrito: agregarProductoAlCarrito
                }
                
            }>
            {props.children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)




export default GlobalContextProvider