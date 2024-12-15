import express from 'express'
import express_handlebars from 'express-handlebars'
const app = express()
const PORT = 3000
//configuramos nuestro motor de plantilla

//indicamos que motor de plantilla utilizaremos
app.engine('handlebars', express_handlebars.engine())

//indicamos que usaremos como plantilla (handlebars)
app.set('view engine', 'handlebars')

//Indicamos la direccion de las vistas
app.set('views', './views')

app.use(express.static('public'))

app.get('/', (req, res) =>{
    res.render('home', {         
        layout: 'main',
        payload:{
            title: "Pagina 1",
            isRegistered: true,
            username: 'Usuario: Juancito'
            
        },
        helpers:{
        isReg(){
            return true
            }
        }
        
    })
})

app.listen(PORT, ()=>{
    console.dir(`La aplicacion se esta ejecutando correctamente en http://localhost:${PORT}`)
})