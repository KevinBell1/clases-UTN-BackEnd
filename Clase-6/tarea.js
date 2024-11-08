"use strict";
class Accion {
    constructor(id, descripcion, fecha) {
        this.id = id;
        this.descripcion = descripcion;
        this.fecha = fecha;
    }
}
class Historial {
    constructor() {
        this.historial_acciones = [];
    }
    agregarAcciones(accion) {
        this.historial_acciones.push(accion);
        accion.id = accion.id++;
    }
    eliminarAccionPorId(id) {
        this.historial_acciones = this.historial_acciones.filter((accion) => accion.id !== id);
    }
    eliminarTodo() {
        this.historial_acciones = [];
    }
    mostrarHistorial() {
        this.historial_acciones.forEach((accion) => {
            console.log('Descripcion: ' + accion.descripcion + ', Fecha: ' + accion.fecha + ', id: ' + accion.id);
        });
    }
}
const historial = new Historial();
historial.agregarAcciones(new Accion(1, 'pepe', new Date()));
historial.agregarAcciones(new Accion(2, 'jorge', new Date()));
historial.agregarAcciones(new Accion(3, 'cristian', new Date()));
historial.agregarAcciones(new Accion(4, 'maria', new Date()));
/* historial.eliminarAccionPorId(2)

historial.mostrarHistorial()

historial.eliminarTodo() */
console.log(historial);
