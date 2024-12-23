//Los middleware son funciones que se anteponen o se interponen entre una consulta y la respuesta del servidor (controlador)
//el next es una funcion que va a indicar que la consulta puede seguir al siguiente middleware o controlador
const testMiddleware = (req, res, next) =>{ 
    console.log('Middleware ejecutado')
    if(.5 < Math.random()){
        res.status(400).json({message: 'Error no has tenido suerte'})
    }else{
        next()
    }
}
export default testMiddleware