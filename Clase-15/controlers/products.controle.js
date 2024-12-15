import responseBuilder from '../builders/response.builder.js'
import { productos } from '../routes/products.routes.js'
import fileSystem from 'fs'

export const getProductByIdControler = async (req,res) => {
    const {product_id} = req.params
    const productoBuscado = productos.find(producto => producto.id === Number(product_id))

    try{
        if(!productoBuscado){
            const response = new responseBuilder()
            .setOk(true)
            .setStatus(404)
            .setMessage("No se encontro el producto")
            .setPayload({
                producto: null
            })
            .build()
    
            return res.status(404).json(response)
        }
        const response = new responseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage("Producto obtenido")
        .setPayload({
            producto: productoBuscado
        })
        .build()
    
        return res.status(200).json(response)
    }catch(error){
        const response = new responseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage("Internal Error")
        .setPayload({
            detail: error.code
        })
        .build()

        res.status(500).json(response)
    }
}

export const getAllProductsControler = async (req,res) =>{
    try{

        const activeProducts = productos.filter(producto => producto.active === true)
        
        if(activeProducts.length === 0){
            const response = new responseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage("Error en la busqueda")
            .setPayload({
                detail: "Aun no hay productos en la pagina"
            })
            .build()

            return res.status(500).json(response)
        }

        const response = new responseBuilder()
                .setOk(true)
                .setStatus(200)
                .setMessage("Producto obtenido")
                .setPayload({
                    productos : activeProducts
                })
                .build()

            return res.status(200).json(response)
    }catch(error){
        const response = new responseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage("Internal Error")
        .setPayload({
            detail: error.message
        })
        .build()

        return res.status(500).json(response)
    }
    
}

export const postProductControler = async (req,res) => {
    try{
        const {title, price, categoria, stock} = req.body
    const categorias_validas = ["ropa", 'tecnologia', 'jugueteria']

    const response = new responseBuilder()
    .setOk(false)
    .setStatus(400)

    //Validaciones
        const erroresValidacion = []

    if(!title || typeof title !== "string" || title.trim() === ''){
        erroresValidacion.push('El titulo no es un string valido')
    }
    if(isNaN(price) || price < 1){
        erroresValidacion.push('El precio no es valido')
    }
    if(!stock || stock < 1){
        erroresValidacion.push('Debe de haber un stock y debe de ser positivo')
    }
    if(!categorias_validas.includes(categoria)){
        erroresValidacion.push('Categoria invalida')
    }
    if(erroresValidacion.length > 0){
        let errorMensaje = `Errores de validacion\n` + erroresValidacion.join('\n-')  //hacemos un array de errores, hacemos un mensaje donde ubiquemos todos los objetos del array con una separacion de un salto de linea y un guion entre cada uno
        response
        .setMessage(errorMensaje)
        .build()

        return res.status(400).json(response)
    }

    //
    const exist = productos.some(producto => producto.title === title)
    if(exist){
        response
        .setOk(false)
        .setStatus(400)
        .setMessage("Este producto ya existe")
        .build()

        return res.status(400).json(response)
    }

    const nuevoProducto = {
        id: productos.length + 1 ,
        title,
        price,
        categoria,
        stock,
        active: true

    }
    productos.push(nuevoProducto)

    await fileSystem.promises.writeFile("./data/products.json", JSON.stringify(productos), {encoding: "utf-8"})
    response 
    .setOk(true)
    .setStatus(200)
    .setMessage("Producto Creado")
    .setPayload({
        productos
    })
    .build()
    return res.status(200).json(response)
    }catch(error){
        console.log(error)
        const response = new responseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage("Server Error")
        .setPayload({
            detail: error.message
        })
        .build()

        return res.status(500).json(response)
    }

}

export const putProductControler = async (req, res)=>{
    try{
        const {product_id} = req.params
        const response = new responseBuilder()
        //validacion del product id
        if(isNaN(product_id)){
            response
            .setOk(false)
            .setStatus(400)
            .setMessage("Bad request")
            .setPayload({
                detail: "El product_id debe ser un numero"
            })
            .build()
            return res.status(400).json(response)
        }

        const propiedades_permitidas = {
            "title" : {
                validate: (title) => typeof title === "string" && title.trim() !== '',
                error: "El titulo no es un string o esta vacio"
            },
            'price' :{
                validate: (price) => typeof price === "number" && price >= 0,
                error: 'El precio no es un numero o es negativo'
            },
            'stock': {
                validate: (stock) => typeof stock === 'number' && stock >= 0,
                error: "El stock no es un numero o es negativo"
            },
            'categoria' :{
                validate: (categoria) => typeof categoria === "string" && (['ropa', 'tecnologia', 'jugueteria'].includes(categoria)),
                error: "La categoria no es un string o no es una de las categorias existentes"
            }
        }
        const errores = []
        const propiedades_validas = Object.keys(propiedades_permitidas)

        //chatgpt consultar
        for(let propiedad in req.body) {
            if(!propiedades_validas.includes(propiedad)){
                errores.push(`la propiedad ${propiedad} no es valida`)
            }
        }

        for(let propiedad in propiedades_permitidas){
            const valor_propiedad = req.body[propiedad]
            if(valor_propiedad !== undefined){
                let validacion = propiedades_permitidas[propiedad].validate(valor_propiedad)
                if(!validacion){
                    errores.push(propiedades_permitidas[propiedad].error)
                }
            }
        }
        if(errores.length > 0){
            let error = `Errores: ${errores.join('-')}`
            response
            .setOk(false)
            .setStatus(400)
            .setMessage("Se han detectado errores")
            .setPayload({
                detail: error
            })
            .build()

            return res.status(400).json(response)
        }
        const productoAActualizar = productos.find(producto => producto.id === Number(product_id))

        if(!productoAActualizar){
            response
        .setOk(false)
        .setStatus(404)
        .setMessage("Error en la busqueda")
        .setPayload({
            detail: 'El producto buscado no existe'
        })
        .build()
        return res.status(404).json(response)
        }


        /* 
        {
            title: "tv",
            price: 200
        }
        */
        const nuevasPropiedades = req.body

        for(let nuevaPropiedad in nuevasPropiedades){   //por cada propiedad dentro de nuevas propiedades (title y price)...
            productoAActualizar[nuevaPropiedad] = nuevasPropiedades[nuevaPropiedad] // voy a ir a mi producto a actualizar, y en su propiedad a actualizar voy a darle el valor del array de nuevas propiedades y le voy a dar el valor de la nueva propiedad(title y price)
        }

        await filesystem.promises.writeFile("./data/products.json", JSON.stringify(productos), {encoding: 'utf-8'})

        response
        .setOk(true)
        .setStatus(200)
        .setMessage('Producto actualizado')
        .setPayload({
            productos
        })
        .build()
        return res.status(200).json(response)

    }catch(error){
        const response = new responseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage("SERVER ERROR")
        .setPayload({
            detail: error.message
        })
        .build()
        return res.status(500).json(response)
    }
}

export const deleteProductControler = (req, res) => {
    try{
        const {product_id} = req.params
        const productoAEliminar = productos.find(producto => producto.id === Number(product_id) && producto.active === true)
        if(!productoAEliminar){
            const response = new responseBuilder()
            .setOk(true)
            .setStatus(404)
            .setMessage("Error en la busqueda")
            .setPayload({
                detail: "El producto no ha sido encontrado o ya no existe"
            })
            .build()
    
            res.status(404).json(response)
        }
    
        productoAEliminar.active = false
    
        const response = new responseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage("El producto ha sido eliminado")
        .setPayload({
            detail: `se ha eliminado el producto con id ${product_id}`
        })
        .build()
    
        res.status(200).json(response)
    }catch(error){
        const response = new responseBuilder()
        .setOk(true)
        .setStatus(500)
        .setMessage("Internal Error")
        .setPayload({
            detail: error.code
        })
        .build()
    
        res.status(500).json(response)
    }
}