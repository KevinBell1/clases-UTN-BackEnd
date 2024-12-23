import React from 'react'
import useForm from '../Hooks/useForm'
import {Link, useParams } from 'react-router-dom'
import Form from '../Components/Form'

const ForgotPasswordScreen = () => {
    const form_fields = [
        {
        label_text: 'Ingresa mail de recuperacion',
        field_component: 'input',
        field_container_props: {}, //aqui podemos poner o no las propiedades del div
        field_data:{
            name: 'email',
            id: 'email',
            placeholder: 'nanana@example.com',
            type: 'email'
        }
    }
]
    const initial_state_form = {
        email:''
    }
    const submitForgotPassword = async (form_state) =>{
        console.log(form_state.email)
        const responseHTTML = await fetch ('http://localhost:3000/api/auth/forgot-password', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: form_state.email
            })
        })
        const data = await responseHTTML.json()
        console.log(data)
    }
    return (
        <div>
            <h1>Restrablecer tu contraseña</h1>
            <p>Al restablecer la contraseña se enviara un mail</p>
            <Form  form_fields={form_fields} initial_state_form={initial_state_form} action={submitForgotPassword}>
                <button type='submit'>Restablecer </button>
                <Link to='/login'>Iniciar Sesion</Link>
            </Form>
        </div>
    )
}

export default ForgotPasswordScreen