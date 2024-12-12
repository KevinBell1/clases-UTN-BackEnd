import express from "express";    // npm i express
import filesystem from 'fs'

//se crea una instancia de servidor http (nos trae un objeto en el cual podemos agregarle funcionalidades)
const app = express()

const PORT = 4000

//configuramos que cuando se ejecute el endpoint /obtener-usuarios, se realizara la siguiente accion. Para ejecutarla necesitamos postman y emular una api
//request es un objeto de datos del consultor
//response es un objeto de respuesta del servidor
/* app.get('/obtener-usuarios', async (request, response) => {
    console.log('recibido')
    
    
    const resultado = await filesystem.promises.readFile("./public/usuarios.json", {encoding: "utf-8"})
    const data = JSON.parse(resultado)
    response.json({'Consulta recibida': "positive", "code": 1, "usuarios": data})
})
 */
//response.send() nos permite responder con valores json, html, etc
//response.json() nos asegura que se respondera un json
//response.status() configuramos el status http

//listen espera recibir dos valores, el puerto al que le daremos acceso y la callback
app.listen(PORT, () => {
    //esta accion se ejecutara cuando se este escuchando mi aplicacion en el puerto
    console.log(`hola mundo desde el puerto ${PORT}`)
})

// URL --> http://localhost:4000(puerto que usamos arriba)/obtener-usuarios(funcion que queremos referenciar)

//Tarea
app.get("/obtener-productos", async (request, response) => {
    try{
        const resultado = await filesystem.promises.readFile("./public/productos.json", {encoding: "utf-8"})
        const data = JSON.parse(resultado)
        response.status(200).json({"mensaje": "Productos obtenidos", "status": 200, "ok": true, "Data": data})
    }
    catch(error){
        console.error(error)
        response.status(500).json({"mensaje": "SERVER ERROR: Productos no obtenidos", "status": 500, "ok": false, "Data": null})
    }

})