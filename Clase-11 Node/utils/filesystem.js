
const filesystem = require('fs')   //importamos la funcion

/* filesystem.writeFileSync('prueba.txt', 'hola desde node', {encoding: 'utf-8'}) */

// Esta funcion crea un archivo (primer parametro), con cierto contenido (lo que contendra. solo recibe strings(se recomienda usar JSON.stringtify(<contenido>))) escrito en cierta codificacion

/* filesystem.writeFileSync('prueba.json', JSON.stringify({nombre: 'hola pepe'}), {encoding: 'utf-8'}) */


//tambien podemos leer textos con
/* const resultado = filesystem.readFileSync('prueba.txt', {encoding: 'utf-8'})
console.log(resultado) */

// const objeto = JSON.parse(filesystem.readFileSync('prueba.json', {encoding: 'utf-8'}))     //json es un string, siempre hay que transformarlo en objeto con JSON.parse

// console.log(objeto.nombre)

const createTxt = async (fileName, text) => {

    if(!fileName){
        console.error('no has escrito el nombre del archivo')            //console.dir('escribe en verde') console.warn('marca en amarillo como alerta')
    }
    else{console.trace('hola')     //traza el error, buscar que hace
    }
    const file = fileName + '.txt'
    /* filesystem.writeFileSync(file, text, {encoding: 'utf-8'}) */
    await filesystem.promises.writeFile(file, text, {encoding: 'utf-8'})   // las promesas tienen 3 'estados', pendiente rejected o completo. sin el await, el filesystem se resolveria en pendiente y seguiria lo de abajo. para evitar esto, se pone el await y todo lo que este debajo esperara a que se complete esto
    let texto = await filesystem.promises.readFile(file, {encoding: 'utf-8'})
    console.log(texto)
}

module.exports = {createTxt}