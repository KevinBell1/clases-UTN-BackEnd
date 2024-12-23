import {React, useState }from 'react'
import useForm from '../Hooks/useForm'
import { Link, useNavigate } from 'react-router-dom'

const RegisterScreen = () => {
    const navigate = useNavigate()
    //Cuando invoco a useForm se crea otro estado de formulario y me devuelve dicho estado una funcion para asociar a cada input y que modifiquen mi estado de formulario

    const {formState, handleChange} = useForm({ //funcion generica que tome el form que pasa y poder manejarla
        name: '',
        email: '',
        password: ''
    })

    const [errorsState, setErrorState] = useState({
        name: '',
        email:'',
        password:'',
    })

    const handleRegister = async (event) => {
        event.preventDefault()
        console.log('Formulario registro enviado')

        //hacemos la consulta como en post man pero desde front end
        const responseHTTP = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formState)
        })
        console.log(responseHTTP)
        const data = await responseHTTP.json()
        console.log(data)
        if(!data.ok){
            if(data.data.registerState.name.errors){
                //seteamos el error
                setErrorState((prevState) => {
                    return {...prevState, name: data.data.registerState.name.errors}
                })
            }
        }else{
            navigate('/login')
        }

    }
    console.log(formState)
    return (
        <div>
            <h1>Registrate en Brand name</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="">Ingrese su nombre</label>
                    <input 
                    name= 'name' 
                    id= 'name' 
                    placeholder='Cosme Fulanito' 
                    type='text'
                    onChange={handleChange} 
                    value={formState.name}/>
                </div>
                {
                    errorsState.name && <span>{errorsState.name}</span>
                }
                <div>
                    <label htmlFor="">Ingrese su email</label>
                    <input
                    name= 'email'
                    id= 'email' 
                    placeholder='CosmeFulanito@gmail.com' 
                    type='email'
                    onChange={handleChange} 
                    value={formState.email}/>
                </div>
                {
                    errorsState.email && <span>{errorsState.email}</span>
                }
                <div>
                    <label htmlFor="">Ingrese su contraseña</label>
                    <input name= 'password' 
                    id= 'password' 
                    placeholder='escriba su contraseña' 
                    type='password'
                    onChange={handleChange} 
                    value={formState.password}/>
                </div>
                {
                    errorsState.password && <span>{errorsState.password}</span>
                }
                <button type='submit'>Registrarse</button>
                <Link to= '/forgot-password'>Olvide mi contraseña</Link>
            </form>
        </div>
    )
}

export default RegisterScreen