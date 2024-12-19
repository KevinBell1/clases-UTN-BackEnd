import React from 'react'

const RegisterScreen = () => {

    const handleRegister = async (event) => {
        event.preventDefault()
        console.log('Formulario registro enviado')

        //esto es para recibir el objeto con los valores de mi formulario
        const form_state = {
            email: '',
            password: '',
            name: ''
        }
        const formularioJSX = event.target   //trae el elemento html
        const formulario_valores_form_data = new FormData(formularioJSX) //formdata es un consultor que devuelve un objeto con los valores del formulario

        for (let field in form_state){
            form_state[field] = formulario_valores_form_data.get(field)
        }
        //hasta aca 
        console.log(form_state)

        //hacemos la consulta como en post man pero desde front end
        const responseHTTP = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(form_state)
        })
        console.log(responseHTTP)
        const data = await responseHTTP.json()
        console.log(data)
    }

    return (
        <div>
            <h1>Registrate en Brand name</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="">Ingrese su nombre</label>
                    <input name= 'name' id= 'name' placeholder='Cosme Fulanito' type='text'/>
                </div>
                <div>
                    <label htmlFor="">Ingrese su email</label>
                    <input name= 'email' id= 'email' placeholder='CosmeFulanito@gmail.com' type='email'/>
                </div>
                <div>
                    <label htmlFor="">Ingrese su contraseña</label>
                    <input name= 'password' id= 'password' placeholder='escriba su contraseña' type='password'/>
                </div>
                <button type='submit'>Registrarse</button>
            </form>
        </div>
    )
}

export default RegisterScreen