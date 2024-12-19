//logica de conexion con la db
//npm i mongoose

import mongoose from "mongoose"
import User from "../models/user.model.js"

const MONGO_URL = 'mongodb://localhost:27017/PRUEBA_MONGOOSE' 
//connect establece una conexion con la db
//recibe un connection string (url de la db) y un objeto de configuracion
mongoose.connect(MONGO_URL, {})
//la promesa puede estar pendiente aceptada o rechazada. then es la promesa aceptada. catch es la promesa rechazada
.then(()=>{
    console.dir("la promesa se resolvio")
    
    
})
.catch((error)=>{
    console.error("La conexion con mongoDB ha fallado", error)
})
/*  .finally(       se ejecuta cuando finalice el proceso
()=> {
    console.log('el proceso finalizo)
}) */
export default mongoose