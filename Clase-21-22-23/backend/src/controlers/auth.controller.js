import ResponseBuilder from "../../helpers/builders/responseBuilder.js"
import { verifyEmail, verifyMinLength, verifyString } from "../../helpers/validation.helpers.js"
import ENVIROMENT from "../config/enviroment.js"
import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer"
import jsonwebtoken from 'jsonwebtoken'
import transporterEmail from "../../helpers/emailTransporter.helper.js"



const registerController = async (req, res) =>{
    try{
        const {name, password, email} = req.body
    const registerConfig = {
        name: {
            value: name,
            errors: [],
            validation: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 5)
            ]
        },
        password: {
            value: password,
            errors: [],
            validation: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        },
        email: {
            value: email,
            errors: [],
            validation: [
                verifyEmail,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        }
    }
    let hayErrores = false
    for (let field_name in registerConfig){
        for(let validation of registerConfig[field_name].validation){
            let result = validation(field_name, registerConfig[field_name].value)
            if(result){
                hayErrores = true
                registerConfig[field_name].errors.push(result)
            }
        }
    }

    if(hayErrores){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setCode('VALIDATION_ERROR')
        .setData(
            {registerState: registerConfig}
        )
        return res.json(response)
    }

    const hashedPassword = await bcrypt.hash(registerConfig.password.value, 10) //recibe el valor y las rondas o nivel de complejidada
//recibe payload(contenido), clave secreta (utilizada para firmar, se cambia cada 3 meses y va en el env) y options (es un objeto de configuracion)
    const validation_token = jsonwebtoken.sign({
        email: registerConfig.email.value
    },
    ENVIROMENT.SECRET_KEY,
    {
        expiresIn: '1d'
    }
    
    )

    const redirectUrl = `http://localhost:3000/api/auth/validate-email/` + validation_token

    const result = await transporterEmail.sendMail({
        subject: 'Valida tu email',
        to: registerConfig.email.value,
        html: `
        <h1>Valida tu mail</h1>
        <p>Para validar tu mail haz click en <a href= "${redirectUrl}">Este enlace</a></p>
        `
    })

    const userCreated = new User({name: registerConfig.name.value , email: registerConfig.email.value, password: hashedPassword, verificationToken: ''}) // crea el usuario, con .save lo guarda en mongodb
    await userCreated.save()

    const response = new ResponseBuilder()
    .setCode('SUCCES')
    .setOk(true)
    .setStatus(200)
    .setData(
        {registerResult: registerConfig}
    )
    .build()
    return res.json(response)
    }catch(error){
        if(error.code === 11000){
            const response = new ResponseBuilder()
            .setCode(error.code)
            .setOk(false)
            .setStatus(500)
            .setData(
                {message: 'El mail ya esta registrado'}
            )
            .build()
            return res.json(response)
        }
        const response = new ResponseBuilder()
        .setCode(error.code)
        .setOk(false)
        .setStatus(500)
        .setData(
            error.message
        )
        .build()
        return res.json(response)
    }
}

export const verifyEmailController = async (req, res) =>{
    try{
        const {validation_token} = req.params
    console.log('Token recibido: ', validation_token)
    const payload = jsonwebtoken.verify(validation_token, ENVIROMENT.SECRET_KEY) // le poasamos el token y la clave, esto verifica si la firma es nuestra y no esta expirado
    const email_to_verify = payload.email
    const user_to_verify = await User.findOne({email: email_to_verify})
    console.log(user_to_verify)
    user_to_verify.emailVerified = true
    await user_to_verify.save()
    res.sendStatus(200)
    /* redirect, al front end */
    }catch(error){
        console.error(error)
    }
}

export const loginController = async (req, res)=>{
    try{
        const {email, password} = req.body//recibir el mail y password del body
        //validaciones
        const user = await User.findOne({email: email}) //buscar en la db si existe un usuario con dicho mail
        if(!user){
            res.sendStatus(404)
        }
        const isCorresctPassword = await bcrypt.compare(password, user.password)//comparar la password con el hash
        if(!isCorresctPassword){//si es false, error
            res.json(401)
        }
        if(!user.emailVerified){//verifica si su email esta validado
            res.sendStatus(403)
        }
        const access_token = jsonwebtoken.sign(//firmo el acceso 
            {
                user_id: user.id,
                name: user.name,
                email: user.email
            },
            ENVIROMENT.SECRET_KEY,
            {
                expiresIn: '1d'
            }
    )
        const response = new ResponseBuilder()
        .setOk(true)
        .setCode('LOGGED_SUCESS')
        .setMessage('Logged Sucess!')
        .setStatus(200)
        .setData({
            access_token: access_token,
            user_info:{
                user_id: user.id,
                name: user.name,
                email:user.email
            }
        })
        .build()
        res.status(200).json(response)
    }catch(error){
        console.error(error.message)
    }
}

export default registerController