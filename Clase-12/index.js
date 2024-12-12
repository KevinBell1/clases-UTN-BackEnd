import { crearJson, leerJson2, productManager } from "./utils/fileSystemManager.js";



const test = async (fileName, object) =>{
    try{
        const probar = await crearJson(fileName,object)

        console.log('accion super importante')
    }
    catch{
        console.error('Ha ocurrido un error desconocido')
    }
}
test('counters', {
    products : 0
})

productManager.createProduct("hola", "descripcion", 4000)
productManager.createProduct("hola", "descripcion", 1000)
productManager.createProduct("hola", "descripcion", 1000)