import express from "express"
import filesystem from 'fs'
import responseBuilder from "../builders/response.builder.js"

const userRouter = express.Router()


//es como si fuera app pero asignado al endpoint especifico. El endpoint seria 
userRouter.get("/", async (req, res)=>{
    try{
        const users = JSON.parse( await filesystem.promises.readFile("./data/usuarios.json", {encoding: "utf-8"}))

    //esto genera un objeto. Cuando se instancie traera la clase
    const response = new responseBuilder()
    .setOk(true)
    .setStatus(200)
    .setMessage("Usuarios Obtenidos") 
    .setPayload({
        users: users
    })
    .build()
    // Lo que ocurre es que cada set cambia su valor y vuelve a devolver el objeto entero con ese cambio, para pasar al siguiente set y lo tome como si nunca hubiece sido cambiado y asi, finalmente el build solamente devuelve el objeto entero
    res.json(response)
    }
    catch(error){
        const response = new responseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage("Internal error")
        .setPayload({
            detail: error.message
        })
        .build()

        res.status(500).json(response)
    }

})

export default userRouter