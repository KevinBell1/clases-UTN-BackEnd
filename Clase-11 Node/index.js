// pasos para empezar un proyexto en node.js.   cuando instalamos react instalamos nodejs

//1  en la terminal: npm init -y

//2  la primera vez ponemos npm i -g nodemon instala nodemon de manera global
// Es una libreria de desarrollo que nos permite ejecutar nuestro codigo cada vez que guardemos
// es una buena practica instalar a nivel proyecto con npm i -D nodemon asi los siguientes programadores ven que se esta usando nodemon en package json
// una alternativa nativa con watch es node ---watch <fileName> 

/* "scripts": {
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
    
  }, */      

// asi debe de quedar nuestro stript en package.json. luego en la consola escribir npm run dev

const {createTxt} = require('./utils/filesystem')      //Require, module.exports es como funcionan las importaciones en COMMONJS (formato antiguo de javascript)
/* si, en package json, el type esta omitido, se hara el commonjs. sino debemos de poner 'type' */

createTxt('prueba-3', 'hola buenas tardes, como va')