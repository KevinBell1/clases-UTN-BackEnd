import { crearJson2, leerJson2 } from "./utils/fileSystemManager.js";




const test = async (fileName, object) =>{
    try{
        const probar = await crearJson2(fileName,object)

        console.log('accion super importante')
    }
    catch{
        console.error('Ha ocurrido un error desconocido')
    }
}
test('probandopor2', {})