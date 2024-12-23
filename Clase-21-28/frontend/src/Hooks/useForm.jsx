import { useState } from "react"

const useForm =(InitialForm) =>{
    //logica de formulario y estados
    const [formState, setFormState] = useState(InitialForm)

    const handleChange = (event) =>{
        const field_name = event.target.name
        const field_value = event.target.value
        console.log('Probando: ',field_name, field_value)
        //esta es la funcion de mi estado que permite modificar el estado y re renderizar el componente
        //el parametro que recibe la callback es el estado previo de el estado
        setFormState((prevFormState)=>{ //el valor del estado sera el retorno de la callback
            //siempre hay que trabajar con un estado previo para coordinar las funciones y que no se ejecuten al mismo tiempo. el prevFormState toma como predeterminado el valor de formstate
            return {...prevFormState, [field_name]: field_value} //hago una copia de prevFormState, y en el lugar del campo, cambiaremos el valor del campo
        })
    }
    return {
        formState,
        handleChange
    }
}


export default useForm