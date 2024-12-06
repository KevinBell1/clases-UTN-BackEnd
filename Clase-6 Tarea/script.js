"use strict";
class Accion {
    constructor(id, descripcion, fecha) {
        this.id = id;
        this.descripcion = descripcion;
        this.fecha = fecha;
    }
    MostrarDetalle() {
        console.log(`ID: ${this.id}`);
        console.log(`Descripcion: ${this.descripcion}`);
        console.log(`Fecha: ${this.fecha}`);
    }
}
class Historial {
    constructor() {
        this.historial_acciones = [];
    }
    agregarAcciones(accion) {
        this.historial_acciones.push(accion);
        console.log(`Accion: ${accion.id} ha sido agregada`);
    }
    eliminarAccionPorId(id) {
        this.historial_acciones = this.historial_acciones.filter((accion) => accion.id !== id);
    }
    eliminarTodo() {
        this.historial_acciones = [];
    }
    mostrarHistorial() {
        this.historial_acciones.forEach((accion) => accion.MostrarDetalle());
    }
}
class AccionIniciarSesion extends Accion {
    constructor(id, descripcion, fecha, dispositivo_origen) {
        super(id, descripcion, fecha);
        this.dispositivo_origen = dispositivo_origen;
    }
    MostrarDetalle() {
        super.MostrarDetalle();
        console.log(`Se ha iniciado sesion desde ${this.dispositivo_origen}`);
    }
}
class AccionCerrarSesion extends Accion {
    constructor(id, descripcion, fecha, dispositivo_origen, tiempo_de_sesion) {
        super(id, descripcion, fecha);
        this.dispositivo_origen = dispositivo_origen;
        this.tiempo_de_sesion = tiempo_de_sesion;
    }
    MostrarDetalle() {
        super.MostrarDetalle();
        console.log(`se ha cerrado la sesion desde ${this.dispositivo_origen}. La sesion ha durado ${this.tiempo_de_sesion} minutos`);
    }
}
class AccionCambio {
    constructor(id_cambio, valor_anterior, nuevo_valor) {
        this.id_cambio = id_cambio,
            this.valor_anterior = valor_anterior;
        this.nuevo_valor = nuevo_valor;
    }
    mostrarDetalle() {
        console.log(`el valor ${this.valor_anterior} ha sido cambiado por ${this.nuevo_valor}. Id del cambio: ${this.id_cambio}`);
    }
}
class AccionCompra extends Accion {
    constructor(descripcion, fecha, id, productos, total) {
        super(id, descripcion, fecha);
        this.productos = productos;
        this.total = total;
    }
    mostrarDetalle() {
        super.MostrarDetalle();
        console.log(`Productos: ${this.productos}`);
        console.log(`Total: $${this.total}`);
    }
}
class AccionEnvioMensaje extends Accion {
    constructor(descripcion, fecha, id, destinatario, mensaje) {
        super(id, descripcion, fecha);
        this.destinatario = destinatario;
        this.mensaje = mensaje;
    }
    mostrarDetalle() {
        super.MostrarDetalle();
        console.log(`Destinatario: ${this.destinatario}`);
        console.log(`Mensaje: ${this.mensaje}`);
    }
}
const historial = new Historial();
const InicioSesion = new AccionIniciarSesion(7, 'accion1', new Date(), 'pc de escritorio');
const CerrarSesion = new AccionCerrarSesion(2, 'Cerrar Sesion', new Date(), 'pc de escrtorio', 423);
historial.agregarAcciones(InicioSesion);
historial.agregarAcciones(CerrarSesion);
historial.mostrarHistorial();
