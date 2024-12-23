/* npm i dotenv */
//Modulo con la logica de las variables de entorno de mi aplicacion
import dotenv from 'dotenv'
dotenv.config(/* {     //podemos configurar al llamado y agregarle mediante path la direccion del .cnv
    path: 
} */)

//configuramos en process.env las variables de entorno del archivo env en una variable global
const ENVIROMENT = {
    EMAIL_PASSWORD:process.env.EMAIL_PASSWORD || '',
    EMAIL_USER: process.env.EMAIL_USER || '',
    SECRET_KEY: process.env.SECRET_KEY || '',          /* api key generator} */
    URL_FRONTEND: process.env.URL_FRONTEND || '',

    MYSQL: {
        HOST: process.env.MYSQL_HOST,
        DATABASE: process.env.MYSQL_DATABASE,
        USERNAME: process.env.MYSQL_USERNAME,
        PASSWORD: process.env.MYSQL_PASSWORD
    }
}

export default ENVIROMENT

//ejecutar el env: node ./src/config/enviroment