import jwt from 'jsonwebtoken'
import ENVIROMENT from '../config/enviroment.js'
import AppError from '../helpers/errors/app.error.js'

const authMiddleware = (roles_permitidos)=>{
    return (req, res, next) => {
        try{
            //los headers son valores que se inician en la cabecera de la consulta
        //Este header generalmente tiene informacion de la autorizacion 
        const auth_header = req.headers['authorization']

        if(!auth_header){
            return res.json({message: 'Falta el token de autorizacion'}) //Bearer token_value
        }

        const access_token = auth_header.split(' ')[1]//split nos permite dividir el primer del segundo valor. el espacio es el criterio de separacion que devuelve un array con dos valores

        if(!access_token){
            return res.json({message: 'El token de autorizacion esta mal formado'})
        }

        const user_session_payload_decoded = jwt.verify(access_token, ENVIROMENT.SECRET_KEY ) //1 decodifico el token de accesso (quien tiene valores internamente)
        //request es un objeto con datos de la consulta 
        req.user = user_session_payload_decoded //2 guardo en el request del usuario a la informacion del token

        if(!roles_permitidos.includes(user_session_payload_decoded.role)){
            return res.json({message: 'No tienes permiso para realizar esta operacion', status: 403})
        }

        next() 
        }catch(error){
            res.json(error.message)

        }
    }
}

export default authMiddleware