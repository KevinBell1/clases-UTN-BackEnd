import filesystem from 'fs'

const crearJson = async (fileName, object) => {

    try{
            //si ocurre esto...
        if(!fileName){
            throw{code: "ERR_INVALID_ARG_TYPE", detail: 'El nombre del archivo es obligatorio'}
        }
        if(fileName<1){
            console.error('El nombre del archivo debe tener al menos un caracter')
            return;
        }
        if(typeof(object) !== 'object'|| typeof(object) === null){
            {console.error('El contenido debe de ser un objeto')}
            return;
        }
        
        const file = fileName + '.json'
        const stringConverter = JSON.stringify(object)
        await filesystem.promises.writeFile(file, stringConverter, {encoding: 'utf-8'})
        console.dir("Creado con exito")
    }
    catch(error){
        console.log('Ha ocurrido un error')
        console.error(error.detail)
    }
}

const leerJson2 = async (file) => {
    const jsonConverted = file + ".json"

    const lector = await filesystem.promises.readFile(jsonConverted, {encoding: 'utf-8'})

    const parseConverter = JSON.parse(lector)
    return parseConverter
}


export{crearJson, leerJson2}



/* Crear un archivo llamado counters.json usando la funcion crearJson, counters.json sera un objeto con el sig formato
{
    products: 0
}

Crear un ProductManager
debe ser una clase con los metodos estaticos:
createProduct
updateProduct
deleteProduct
getProducts
getProductById

Debe manejarse con persistencia de datos con filesystem usando las funciones de utilidad creadas en filesystemManager.js. Los productos se pueden guardar en un archivo llamado products.json

Se debe tener en cuenta que al crear un producto se recibira titulo, descripcion y precio, el id se le asignara automaticamente usando un contador que debe persistir en el archivo json llamado counters.json. Obviamente al crear un producto el contador se debe actualizar en el archivo counters.json y se debe guardar

REGLAS:
-No se puede modificar los archivos usando filesystem, siempre deberemos usar la funcion crearJson o leerJson
-No puede crashear la aplicacion, los errores deben estar manejados
-Los parametros de cada funcion deben estar validados y en caso de no estar deberan tener sus propios throws */

export class productManager{
    static async getCounter(){
        const counterCantidad = await leerJson2("counters")
        return counterCantidad ? counterCantidad : 0
    }
    static productos = []

    static async createProduct(titulo, descripcion, precio){
        const contador = await this.getCounter()
        const nuevoContador = contador + 1
        await crearJson('counters', {"productos" : nuevoContador} )
        this.productos.push({
            "titulo": titulo,
            "descripcion": descripcion,
            "precio": precio,
            "id": nuevoContador
        })
        await crearJson("productos", this.productos)
        console.dir(`Producto creado con id:` + nuevoContador)
    }
}

