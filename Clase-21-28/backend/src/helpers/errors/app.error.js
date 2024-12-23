class AppError extends Error{ // Error es una clase que usa js para crear sus propios tipos de error
    constructor(message, status_code){
        super(message)    //instancia al consultor de los errores
        this.status_code = status_code
        this.status = String(status_code).startsWith('4') ? 'fail' : 'error' //definimos si un error es un error(de sintaxis, de db) o un fallo (no se encuentra el producto, el id, el nombre)
        //nos captura de que linea de codigo se causa el error
        //is_Operational nos dice si debemos responser con ese error. todos los err de app deben tener su propia respuesta, por eso inicia en true
        this.is_Operational = true
        Error.captureStackTrace(this, this.constructor)
    }
}



export default AppError

//new Error('No se') => {message: 'No se'} new error construye el mensaje de error en no se