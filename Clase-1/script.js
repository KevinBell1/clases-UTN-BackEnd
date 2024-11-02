/* FETCH */



/* fetch emite una consulta a una direccion (el primer '') y recibe un retorno (una promesa, es decir una respuesta asincronica o una respuesta que va a tardar en resolverse, y las ejecuta al mismo tiempo que otras) */


/* fetch('', {
    method: 'GET'
})  */


/* podemos hacer una constante respuesta para guardar el resultado de este procedimiento
las promise tienen 3 estados:
pending
resolved
rejected

*/


/* para evitar que se ejecute un pending o antes de resolverse usamos async y await en las funciones */
const obtenerAnakin = async() => {
    const respuesta= await fetch('https://swapi.dev/api/people/1', {
        method: 'GET'
    })
    const data = await respuesta.json()          /* transforma la api que viene en javascript a un json (si es de una api es una promise y hay que agregarle el await) */     
    console.log(respuesta)
}
obtenerAnakin()




/* forEach   recibe una callback y hace una funcion
filterPro    retorna array que cumpla las condiciones que pongamos
 */