import filesystem from 'fs'

const crearJson2 = async (fileName, object) => {

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
    console.log(parseConverter)
}


export{crearJson2, leerJson2}