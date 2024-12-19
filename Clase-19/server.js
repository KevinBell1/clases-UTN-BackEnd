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
const ERRORS_VALIDATION_DICCIONARY = {
    'STRING_VALIDATION': 'STRING_VALIDATION'
    
}


const verifyString = (field_name, field_value) => {
    if(!(typeof(field_value) === 'string')){
        return {
            error: ERRORS_VALIDATION_DICCIONARY.STRING_VALIDATION,
            message: field_name + ' debe ser un texto',
        }
    }
}
const verifyMinLength = (field_name, field_value, minLength) => {
    if(!(field_value.length > minLength)){
        return {
            error: 'MIN_LENGTH_VALIDATION',
            message: field_name + ' debe tener como minimo ' + minLength + ' caracteres',
        }
    }
}

const verifyNumber = (field_name, field_value) => {
    if(!(typeof field_value === 'number')){
        return {
            error: 'NUMBER_VALIDATION',
            message: field_name + ' debe ser un numero',
        }
    }
}

const productos = [
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
    const  producto_buscado = productos.find(producto => producto.id === Number(product_id))
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
    let campos_state = [
        {
            valor: '',
            errors:[],
            component: "input",
            type: 'text',
            isInput: true,
            placeholder: 'Nombre completo',
            label: 'Ingresa el nombre',
            name: 'nombre',
            validations: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 5)
            ]
        },
        {
            valor:'',
            errors:[],
            component: "textarea",
            isTextarea: true,
            placeholder: 'Ingrese la descripcion',
            label: 'Ingresa una descripcion',
            name: 'descripcion',
            validations: [
                verifyNumber
            ]
        },
        { 
            valor: 0,
            errors:[],
            component: "input",
            type: 'number',
            isInput: true,
            placeholder: 'Ingrese un stock',
            label:'Determine un stock',
            name: 'stock',
            validations: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        },
        {
            valor:0,
            errors:[],
            component: "input",
            type: 'number',
            isInput: true,
            placeholder: 'Ingrese un valor',
            label:'Ingrese el precio',
            name: 'precio',
            validations: [
                verifyNumber
            ]
        }
    ]
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

app.post('/product/new',  (req, res)=>{
    try{
        console.log(req.body)
    const {nombre,descripcion, stock, categoria,precio} = req.body
    let campos_state = [
        {
            valor: nombre,
            errors:[],
            component: "input",
            type: 'text',
            isInput: true,
            placeholder: 'Nombre completo',
            label: 'Ingresa el nombre',
            name: 'nombre',
            validations: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 5)
            ]
        },
        {
            valor:descripcion,
            errors:[],
            component: "textarea",
            isTextarea: true,
            placeholder: 'Ingrese la descripcion',
            label: 'Ingresa una descripcion',
            name: 'descripcion',
            validations: [
                verifyNumber
            ]
        },
        { 
            valor: stock,
            errors:[],
            component: "input",
            type: 'number',
            isInput: true,
            placeholder: 'Ingrese un stock',
            label:'Determine un stock',
            name: 'stock',
            validations: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        },
        {
            valor:precio,
            errors:[],
            component: "input",
            type: 'number',
            isInput: true,
            placeholder: 'Ingrese un valor',
            label:'Ingrese el precio',
            name: 'precio',
            validations: [
                verifyNumber
            ]
        }
    ]
    let hayErrores = false
            for(let field of campos_state){
                for(let validation of field.validations){
                    /* result: {error, message} | undefined */
                    let result = validation(field.name, field.valor)
                    if(result){
                        hayErrores = true
                        field.errors.push(result)
                    }
                }
            }
            console.log(campos_state)
    //Validar que los datos tengan sentido
    if (!nombre || nombre.length < 4 || !isNaN(nombre)) {
        campos_state.nombre.error = 'Debes ingresar un nombre valido, minimo 4 caracteres'
    }
    if (!descripcion || descripcion.length < 10 || !isNaN(descripcion)) {
        campos_state.descripcion.error = 'Debes ingresar una descripcion valida, minimo 10 caracteres'
    }
    if (!precio || isNaN(precio)) {
        campos_state.precio.error = 'Debes ingresar una precio valido, solo numeros'
    }
    if (!stock || isNaN(stock)) {
        campos_state.stock.error = 'Debes ingresar una stock valido, solo numeros'
    }

    if (campos_state.nombre.error === null && campos_state.descripcion.error === null && campos_state.precio.error === null && campos_state.stock.error === null){

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
        const id = productos.length + 1

        const nuevo = {
            id,
            nombre,
            precio,
            stock,
            descripcion,
            active: true
        }
        productos.push(nuevo)
        res.redirect('/')
    }catch (error) {
        console.error(error.message)
    }
})

app.get('/', (req, res)=>{
    const view_props = {
        layout: 'main',
        status: 200,
        ok:true,
        payload:{
            title: 'Ofertas de la semana',
            productos
        },
        helpers:{
            
        }
    }
    res.render('home-view', view_props)
})
app.listen(PORT, ()=>{
    console.log('El servidor se esta escuchando en http://localhost:'+ PORT)
})