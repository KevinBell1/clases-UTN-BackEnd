class Empleado {
    nombre: string;
    sueldo: number;
    fecha_contratacion: Date;
    id_empleado: number;
    tipo: Puesto;

    constructor(nombre: string,
        sueldo: number,
        fecha_contratacion: Date, 
        id_empleado: number, 
        tipo: Puesto
    ) {
        this.nombre = nombre;
        this.sueldo = sueldo;
        this.fecha_contratacion = fecha_contratacion;
        this.id_empleado = id_empleado;
        this.tipo = tipo;
    }
    presentarse(){
        console.log('hola soy ' + this.nombre + ' y trabajo de ' + this.tipo)
    }
}
/* HERENCIA: crear una nueva class pero manteniendo la class anterior */
class Pasante extends Empleado{
    tiempo_de_contrato_en_meses: number

    constructor(
        nombre: string, 
        sueldo : number, 
        fecha_contratacion : Date, 
        id_empleado: number, 
        tipo: Puesto,
        tiempo_de_contrato_en_meses: number,
    ){
        /* esta es la invocacion del constructor de Empleado */
        super(nombre, sueldo, fecha_contratacion, id_empleado, tipo)
        this.tiempo_de_contrato_en_meses = tiempo_de_contrato_en_meses
    }
    presentarse(): void {
        console.log('hola soy ' + this.nombre + ' y trabajo como pasante de ' + this.tipo)      /* aca tapamos la funcion de Empleado especificandola en Pasantes */
    }
}

/* 
const pepe = new Empleado('pepe', 2000000, newDate(), 1, 'Depelover')
const susana = new Pasante('susana', 180000, newDate(), 2, 'Depelover', 4 )

pepe.presentarse()
*/

type Puesto = "Project Manager" | "Developer" | "Designer" | "Marketing"


class ManejadorDeEmpleados {
    empleados: Empleado[];
    id_manejador: number;
    tipos_permitidos: string[];
    contador_id: number;

    constructor(id_manejador: number) {
        this.empleados = [];
        this.id_manejador = id_manejador;                           /* esto nos permitira que cada empresa tenga su manejardor de empleados personalizado */
        this.tipos_permitidos = ["Project Manager", "Developer", "Designer", "Marketing"];
        this.contador_id = 1; 
    }

    agregarEmpleado(
        nombre: string, 
        sueldo: number, 
        fecha_contratacion: Date, 
        tipo: Puesto
    ) :void
    /* ponemos void porque esta funcion no tendra retorno al ejecutarse, sino que solo se ejecuta */
    {          
        if (!this.tipos_permitidos.includes(tipo)) {
            console.log(`Error: El tipo de empleado ${tipo} no es válido.`);
        } else {
            const nuevo_empleado = new Empleado(nombre, sueldo, fecha_contratacion, this.contador_id, tipo);
            this.empleados.push(nuevo_empleado);
            console.log(`Empleado ${nombre} agregado con éxito con ID ${this.contador_id}.`);

            this.contador_id++;
        }
    }
 /* es importante saber que si tenemos que obtener deberiamos tener un return */
    obtenerEmpleadoPorId(id_empleado: number) {

/* ponemos empleado o undefined porque si no encuentra la comparacion devolvera un undefined */
        const empleado : Empleado | undefined = this.empleados.find((empleado: Empleado) :boolean => empleado.id_empleado === id_empleado); /* todas las comparaciones son booleans */

        if (empleado) {
            console.log(`El empleado con ID: ${empleado.id_empleado} es ${empleado.nombre}`);
        } else {
            console.log(`No se encontró ningún empleado con ID: ${id_empleado}`);
        }
    }

    obtenerEmpleadosPorTipo(tipo: string) {
        const empleados_filtrados = this.empleados.filter(empleado => empleado.tipo === tipo);

        if (empleados_filtrados.length > 0) {
            console.log(`Empleados de tipo "${tipo}":`);
            empleados_filtrados.forEach(empleado => { 
                console.log(`- ID: ${empleado.id_empleado}, Nombre: ${empleado.nombre}, Sueldo: ${empleado.sueldo}`);  /* en vez de concatenar usamos ${ } */
            });  
        } else {
            console.log(`No se encontraron empleados de tipo "${tipo}".`);
        }
    }
}

const manejador_de_empleados = new ManejadorDeEmpleados(1);

/* manejador_de_empleados.agregarEmpleado('Santiago Barletta', 1000000, new Date(), 'Project Manager');
manejador_de_empleados.agregarEmpleado('Pepe Pompím', 500000, new Date(), 'Developer');
manejador_de_empleados.agregarEmpleado('Freddy Kruegger', 350000, new Date(), 'Designer');
manejador_de_empleados.agregarEmpleado('Jason Voorhees', 300000, new Date(), 'Marketing');

console.log(manejador_de_empleados);
manejador_de_empleados.obtenerEmpleadoPorId(1);
manejador_de_empleados.obtenerEmpleadosPorTipo('Developer');
manejador_de_empleados.obtenerEmpleadosPorTipo('Marketing'); */