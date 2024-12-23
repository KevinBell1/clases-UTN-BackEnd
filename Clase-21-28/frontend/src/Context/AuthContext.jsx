import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext() //creamos un contexto y la guardamos en el componente

export const AuthProvider = ({children}) => {
    //children es una prop para pasar el contenido hijo de nuestro componente (vamos a aplicarlo al app de app.jsx)

    //Si hay token en el session o localstorage entonces esta autentificado
    const is_access_token = Boolean(sessionStorage.getItem('access-token')) //get item devuelve un valor o un nulo, por eso pasamos ese nulo a false por boolean

    const [is_authenticated_state, setIsAuthenticatedState] = useState(is_access_token)
    useEffect(
        () => {
            Boolean(is_access_token) && setIsAuthenticatedState(true) //si el usuario vuelve a cargar vuelve a obtener el token y si esta se cambia a verdadero
        },
        []
    )
    return (
        <AuthContext.Provider
        value={ 
            {
                is_authenticated_state
            }
        }
        >
            {children}
        </AuthContext.Provider>
    )
}