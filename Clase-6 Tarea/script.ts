class Accion{
    id: number;
    descripcion: string;
    fecha: Date;

    constructor(id: number, descripcion: string, fecha: Date){
        this.id = id;
        this.descripcion = descripcion;
        this.fecha = fecha;
    }
    MostrarDetalle(){
        console.log(`ID: ${this.id}`);
        console.log(`Descripcion: ${this.descripcion}`);
        console.log(`Fecha: ${this.fecha}`) ;
    }
}
class Historial {
    historial_acciones: Accion[]
    constructor(){
        this.historial_acciones = []
    }
    agregarAcciones(accion: Accion) :void{
        this.historial_acciones.push(accion)
        console.log(`Accion: ${accion.id} ha sido agregada`)
    }
    eliminarAccionPorId(id: number) :void{
        this.historial_acciones = this.historial_acciones.filter((accion) => accion.id !== id)
    }
    eliminarTodo() :void{
        this.historial_acciones = []
    }
    mostrarHistorial() :void{
        this.historial_acciones.forEach((accion)=>accion.MostrarDetalle())
    }
}

class AccionIniciarSesion extends Accion{
    dispositivo_origen: string;
    constructor(id: number, descripcion: string, fecha: Date, dispositivo_origen: string){
        super(id,descripcion,fecha)
        this.dispositivo_origen = dispositivo_origen
    }
    MostrarDetalle(){
            super.MostrarDetalle()
            console.log(`Se ha iniciado sesion desde ${this.dispositivo_origen}` 
        
        )
    }
}
class AccionCerrarSesion  extends Accion{
    dispositivo_origen: string;
    tiempo_de_sesion: number;

    constructor(id: number, descripcion: string, fecha:Date, dispositivo_origen: string, tiempo_de_sesion: number){
        super(id,descripcion,fecha)
        this.dispositivo_origen = dispositivo_origen;
        this.tiempo_de_sesion = tiempo_de_sesion
    }
    MostrarDetalle(){
        super.MostrarDetalle();
        console.log(`se ha cerrado la sesion desde ${this.dispositivo_origen}. La sesion ha durado ${this.tiempo_de_sesion} minutos`)
    }
}


class AccionCambio {
    id_cambio: number;
    valor_anterior:  string;
    nuevo_valor: string;

    constructor(
        id_cambio: number,
        valor_anterior: string,
        nuevo_valor:string,
    )
        {
    this.id_cambio = id_cambio,
    this.valor_anterior = valor_anterior
    this.nuevo_valor = nuevo_valor
    }
    mostrarDetalle(){
        console.log(`el valor ${this.valor_anterior} ha sido cambiado por ${this.nuevo_valor}. Id del cambio: ${this.id_cambio}`)
    }
}

class AccionCompra extends Accion {
    productos: string[]
    total: number

    constructor(descripcion: string, fecha: Date, id: number, productos: string[], total: number){
        super(id, descripcion,fecha)
        this.productos = productos
        this.total = total
    }

    mostrarDetalle() : void {
        super.MostrarDetalle();
        console.log(`Productos: ${this.productos}`);
        console.log(`Total: $${this.total}`);
    }
}


class AccionEnvioMensaje extends Accion {
    destinatario: string
    mensaje: string

    constructor(descripcion: string, fecha: Date, id: number, destinatario: string, mensaje: string){
        super(id,descripcion,fecha)
        this.destinatario = destinatario
        this.mensaje = mensaje
    }

    mostrarDetalle() : void {
        super.MostrarDetalle();
        console.log(`Destinatario: ${this.destinatario}`);
        console.log(`Mensaje: ${this.mensaje}`);
    }
}





const historial= new Historial()

const InicioSesion = new AccionIniciarSesion(7,'accion1', new Date(), 'pc de escritorio')
const CerrarSesion = new AccionCerrarSesion(2,'Cerrar Sesion', new Date(), 'pc de escrtorio', 423)
historial.agregarAcciones(InicioSesion)
historial.agregarAcciones(CerrarSesion)
historial.mostrarHistorial()