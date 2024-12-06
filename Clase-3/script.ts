/* en la consola poner tsc cada vez qeu modifiquemos ts para que se compile a js y sea utilizable en web */

let nombre= 'pepe'

nombre = '1'
/* una variable puede tener dos tipos de datos posibles */
let calle : null | string


const calcularIva = (precio : number) : number =>{
    return precio * 0.21
}

let resultado :number = calcularIva(400)                /* si no devuelve nada, osea si no tiene return, deberiamos poner :void */

const enviarEmail = (to : string, message: string = 'nadas', subject? : string):void => {           /* si usamos ? es cuando queremos decir que no es necesario que este ese valor para ejecutarse, puede estar o no. si le ponemos = ''  le asignamos el valor en el caso en que no nos pasen uno*/

}