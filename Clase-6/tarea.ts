class Accion{
    id: number;
    descripcion: string;
    fecha: Date;

    constructor(id: number, descripcion: string, fecha: Date){
        this.id = id;
        this.descripcion = descripcion;
        this.fecha = fecha;
    }

}
class Historial {
    historial_acciones: Accion[]
    constructor(){
        this.historial_acciones = []
    }
    agregarAcciones(accion: Accion) :void{
        this.historial_acciones.push(accion)
        accion.id = accion.id++
    }
    eliminarAccionPorId(id: number) :void{
        this.historial_acciones = this.historial_acciones.filter((accion) => accion.id !== id)
    }
    eliminarTodo() :void{
        this.historial_acciones = []
    }
    mostrarHistorial() :void{
        this.historial_acciones.forEach((accion)=>{
            console.log('Descripcion: ' + accion.descripcion + ', Fecha: ' + accion.fecha + ', id: ' + accion.id)
        })
    }
}


const historial= new Historial()

historial.agregarAcciones(new Accion(1, 'pepe', new Date()))
historial.agregarAcciones(new Accion(2, 'jorge', new Date()))
historial.agregarAcciones(new Accion(3, 'cristian', new Date()))
historial.agregarAcciones(new Accion(4, 'maria', new Date()))

/* historial.eliminarAccionPorId(2)

historial.mostrarHistorial()

historial.eliminarTodo() */

console.log(historial)