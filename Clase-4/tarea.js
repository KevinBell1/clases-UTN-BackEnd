"use strict";
let id_conter_2 = 0;
class Empleado {
    constructor(nombre, sueldo, fecha_de_contratacion, id_empleado, tipo) {
        this.nombre = nombre;
        this.sueldo = sueldo;
        this.fecha_de_contratacion = fecha_de_contratacion;
        this.id_empleado = id_empleado;
        this.tipo = tipo;
    }
}
class ManejadorDeEmpleados {
    constructor() {
        this.id_manejador = 0;
        this.empleados = [];
    }
    agregar_empleado(nombre, sueldo, fecha_de_contratacion, tipo) {
        const nuevo_empleado = new Empleado(nombre, sueldo, fecha_de_contratacion, id_conter_2++, tipo);
        this.empleados.push(nuevo_empleado);
    }
    obtener_empleado_por_id(id) {
        return this.empleados.find((empleado) => empleado.id_empleado === id);
    }
    obtener_empleado_por_tipo(tipo) {
        return this.empleados.find((empleado) => empleado.tipo === tipo);
    }
}
const manejador_de_empleados = new ManejadorDeEmpleados();
manejador_de_empleados.agregar_empleado('pepe', 1200, '20/08/2025', 'depelover');
manejador_de_empleados.agregar_empleado('juan', 2000, '10/08/2020', 'depelover Senior');
const empleadoEncontrado = manejador_de_empleados.obtener_empleado_por_id(1);
const empleadoEncontradoPorTipo = manejador_de_empleados.obtener_empleado_por_tipo('depelover Senior');
console.log(empleadoEncontradoPorTipo);
