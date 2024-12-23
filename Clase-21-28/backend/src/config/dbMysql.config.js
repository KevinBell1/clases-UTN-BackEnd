//npm i mysql2
import mysql from 'mysql2/promise'
import ENVIROMENT from './enviroment.js'

const pool =mysql.createPool(
    {
        host: ENVIROMENT.MYSQL.HOST,
        user:ENVIROMENT.MYSQL.USERNAME,
        password: ENVIROMENT.MYSQL.PASSWORD,
        database: ENVIROMENT.MYSQL.DATABASE
    }
)

pool.getConnection().then(
    ()=> {
        console.log('Coneccion exitosa con MYSQL')
    }
)
.catch(error => {
    console.error('Error en esta coneccion con mysql',error)
})
export default pool