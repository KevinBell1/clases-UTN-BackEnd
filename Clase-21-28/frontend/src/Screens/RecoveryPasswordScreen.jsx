import React from 'react'
import useForm from '../Hooks/useForm'
import {Link, useParams } from 'react-router-dom'
import Form from '../Components/Form'

const RecoveryPasswordScreen = () => {
    const {reset_token} = useParams()
    console.log('Token de reset: ', reset_token)
    
    const actionRecoveryPassword = async (form_state) =>{
        console.log(form_state)

        const response = await fetch(
            `http://localhost:3000/api/auth/recovery-password/${reset_token}`,
        {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password: form_state.password
            })
        })
        const data = await response.json();
        console.log({ data });

        // Redirige al usuario a la URL proporcionada en el servidor
        window.location.href = data.redirectUrl;
    }


    const form_fields = [
        {
        label_text: 'Ingresa la nueva contraseña',
        field_component: <input/>,
        field_container_props: {}, //aqui podemos poner o no las propiedades del div
        field_data:{
            name: 'password',
            id: 'password',
            placeholder: '',
            type: 'password'
        }
    }
]
const initial_state_form = {
    password:''
}
    return (
        <div>
            <h1>Modifica tu contraseña</h1>
            <Form action={actionRecoveryPassword} form_fields={form_fields} initial_state_form={initial_state_form}>
                <button type='submit'>Restablecer </button>
                <Link to='/login'>Iniciar Sesion</Link>
            </Form>
        </div>
    )
}

export default RecoveryPasswordScreen