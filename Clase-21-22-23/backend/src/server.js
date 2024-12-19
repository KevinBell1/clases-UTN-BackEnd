import express from 'express'
import statusRouter from './routes/states.routes.js'
import authRouter from './routes/auth.route.js'
import mongoose from './config/db.config.js'
import cors from 'cors'

const PORT=3000
const app = express()

app.use(express.json())
app.use(cors())


app.use('/api/status', statusRouter)
app.use('/api/auth', authRouter)



app.listen(PORT, () =>{
    console.log(`el servidor se esta ejecutando en http://localhost:${PORT}`)
})

/* en caso de error de CORS instalar la libreria de cors y en la app

import cors from 'cors'
app.use(cors())
*/