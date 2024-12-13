import express from 'express'
import userRouter from './routes/users.routes.js'
import productRouter from './routes/products.routes.js'


const app = express()
app.use(express.json())
const PORT = 3000

app.get("/ping", (req, res) => {
    res.json({
        ok: true,
        message: "consulta exitosa",
        status: 200, 
        payload: {
            value: "Pong"
        }
    })
})

//todo lo que llegue a /api/users sera responsabilidad de userRouter. lo usamos para delegar tareas. De esta manera se renderizaria por partes
app.use("/api/users", userRouter)
app.use("/api/productos", productRouter)


app.listen(PORT, ()=>{
    console.log(`La aplicacion se esta ejecutando desde http://localhost:${PORT}`)
})