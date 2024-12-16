//ante cualquier cualquier duda buscamos la libreria y al final npm. 
import express from 'express'
import {engine} from 'express-handlebars'

const app = express()
const PORT = 3000

app.use(express.static('./public'))

app.engine('handlebars', engine())

app.set('view engine', 'handlebars')
app.set('views', './views')
//este es el middleware para indicarle a mi backend que cuando reciba consultas que tengan content type que sea application/www-url/encoded se transformen en objeto y sean mandadas por el body de mi request
app.use(express.urlencoded({extended: true}))

const products = [
    {
        id: 1,
        nombre: 'tv noblex',
        precio: 4000,
        descripcion: 'Una tv que se puede usar para ver canales',
        categoria: ['tecnologia', 'hogar', 'futbol'],
        stock: 4,
        active:true
    },
    {
        id: 2,
        nombre: 'Pc estritorio dell',
        precio: 6000,
        descripcion: 'Una pc cumplidora',
        categoria: ['tecnologia', 'computacion', 'office'],
        stock: 2,
        active:true
    },
    {
        id: 3,
        nombre: 'PC escritorio MSI',
        precio: 10000,
        descripcion: 'Una laptop apta para todo',
        categoria: ['tecnologia', 'computacion', 'office', 'gaming'],
        stock: 7,
        active:true
    }
]

app.get('/product/detail/:product_id', (req, res)=>{
    const {product_id} = req.params
    const  producto_buscado = products.find(producto => producto.id === Number(product_id))
    if(!producto_buscado){
        //logica de 404
    }

    const view_props = {
        layout: 'main',
        status: 200,
        ok:true,
        payload:{
            product: producto_buscado
        },
        helpers:{
            
        }
    }
    res.render('detail-view', view_props)
})

app.get('/product/new', (req, res)=>{
    let campos_state = {
        nombre: {
            valor: '',
            error:null
        },
        descripcion:{
            valor:'',
            error:null
        },
        stock:{ 
            valor: 0,
            error:null
        },
        categoria:{
            valor: '',
            error:null
        },
        precio:{
            valor:0,
            error:null
        }
    }
    const views_props = {
        status:200,
        layout: 'main',
        ok:true,
        payload:{
            form_state: campos_state
        }
    }
    res.render('new-product-view', views_props)
})

app.post('/product/new', (req, res)=>{
    console.log(req.body)
    const {nombre,descripcion, stock, categoria,precio} = req.body

    
    let campos_state = {
        nombre: {
            valor: nombre,
            error:null
        },
        descripcion:{
            valor:descripcion,
            error:null
        },
        stock:{ 
            valor: stock,
            error:null
        },
        categoria:{
            valor: categoria,
            error:null
        },
        precio:{
            valor:precio,
            error:null
        }
    }
    //validar los campos
    if(!nombre){
        campos_state.nombre.error = 'Debe ingresar un nombre'
    }
    const views_props = {
        status:400,
        layout: 'main',
        ok:false,
        payload:{
            form_state: campos_state
        }
    }
    res.render('new-product-view', views_props)
})

app.get('/', (req, res)=>{
    const view_props = {
        layout: 'main',
        status: 200,
        ok:true,
        payload:{
            title: 'Ofertas de la semana',
            products
        },
        helpers:{
            
        }
    }
    res.render('home-view', view_props)
})
app.listen(PORT, ()=>{
    console.log('El servidor se esta escuchando en http://localhost:'+ PORT)
})