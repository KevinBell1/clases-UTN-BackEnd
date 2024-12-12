import express, { urlencoded } from "express"

const app = express()
const PORT = 8000
//Middleware es un programa que se ejecuta entre medio de otro programa
app.use(express.json())            //todas las consultas http que se hagan a mi servidor pasaran por app.use express.json --> si los headers de la consulta son content-type 'aplication/json' entonces guardara el body como json
app.use(express(urlencoded({extended: false})))  //para poder usar en urlencoded o form


app.listen(PORT, () =>{
    console.log(`El servidor funciona en http://localhost:${PORT}`) //cuando se ejecute el servidor se ejecuta la callback
})

app.get("/ping", (req, res) => {          //este es el formato basico de respuesta
    const respuesta = {
        ok: true,       //con el ok podemos determinar si hay o no un fallo, para que el front end cree un fallo a partir de saber si lo hay
        status: 200,    // determina como fue resuelta la operacion en el backend
        payload: {      //payload es un objeto con informacion, tambien llamado response.data/result
            message: "pong"
    }}
    res.status(200).json(respuesta)
})


app.post("/ping", (req, res) => {         //post sirve para enviar informacion al servidor. Para ello vamos a body en postman (ponemos en tipo post), el body se almacenara en la req(req.body)
    console.log('este es el body: ' , req.body)                //necesitamos el middleware para que pueda devolvernos el texto en formato json
    const response = {
        ok: true,      
        status: 200,   
        payload: {      
            message: "pong"
    }}
    res.status(200).json(response)
})


app.post("/register", (req, res) => {
    const {username, password} = req.body
        
        const response = {
            ok: true,
            status: 201,
            message : "Usuario registrado",
            payload: {}
        }

    try{

        console.log(pepito);

        if(!username.trim() || !isNaN(username)){
            response.ok = false,
            response.status = 400,
            response.message = "Error de solicitud"
            response.payload.detail = "El nombre de usuario no es valido"
            return res.status(500).json(response)
        }
        if(!password.trim() || !isNaN(password)){       //.trim quita los espacios de delante y de detras del array
            response.ok = false,
            response.status = 400,
            response.message = "Error de solicitud"
            response.payload.detail = "La contraseña no es valida"
            return res.status(500).json(response)
        }

        response.payload = {
            username,
            password
        }

        return res.status(201).json(response)
    }
    catch(error) {
        console.error(error)
        response.ok = false,
        response.status = 500,
        response.message = "error internal server"
        response.payload.detail = error.message
        return res.json(response)
    }
})

const productos = [
    {
        nombre: "Pantalon",
        descripcion: "Pantalon deportivo",
        precio: 300,
        stock: 10,
        id: 1
    },
    {
        nombre: "camisa",
        descripcion: "camisa deportivo",
        precio: 400,
        stock: 20,
        id: 2
    },
    {
        nombre: "Gorra",
        descripcion: "Gorra new era",
        precio: 35,
        stock: 25,
        id: 3
    },
]
//esta ruta tiene un parametro de busqueda producto_id
app.get('/productos/:producto_id', (req, res) => {
    // req.params es un objeto que guardara todos los parametros de busqueda (el parametro siempre sera string)
    //api/cart/:user_id/:cart_id se guardara como {user_id: "valor", cart_id: "valor"}
    const {producto_id} = req.params

    const productoBuscado = productos.find((producto) => producto.id === Number(producto_id))   //find busca y trae un objeto o un undefined. filter trae un array
    const response = {
        ok : true,
        status: 200,
        payload: {
            message: "Productos obtenidos",
            producto: productoBuscado
        }
    }
    res.status(200).json(response)
})

// cuando existen dos rutas que pueden generar conflicto por tener el mismo nombre, la principal siempre debe ir abajo

app.get('/productos', (req, res) => {
    //los query params se almacenan en req.query
    const {min_price} = req.query
    const productosObtenidos = productos.filter((producto) => producto.precio > min_price)
    const response = {
        ok : true,
        status: 200,
        payload: {
            message: "Productos obtenidos",
            productos: productosObtenidos
        }
    }
    res.status(200).json(response)
})