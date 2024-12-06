/* objeto en typescript */ 

/* const producto: Producto ={
    nombre: 'Tv samsung',
    precio: 2000,
    id:1,
    categoria: 'tecnologia',
}

const venderProducto = (producto :{nombre: string, precio: number, id: number, categoria: string}) => {
    console.log(producto.nombre)
}  */

/* para no tener que nombrar todos los productos cada vez que llamo a producto puedo hacer una interfaz */

/* interface Producto {nombre: string, precio:number, id:number, categoria: string}

const comprarProducto = (producto : Producto)=>{
    console.log(producto.nombre)
} */

/* importante, como no tiene retorno la funcion siempre va a salir en la consola undefined */

/* arrays */
/* const nombres : string[] = ['pepe', 'juan', 'maria']
const mixed : [string, number, boolean] = ['pepe', 1, true] */

/* const productos : Producto[] = [                 en este caso el arraw cumplira con las caracteristicas del interfaz Producto 
    producto,                             
    producto_2, 
] */

    let id_conter :number = 0

    class Usuario{
        /* TIPADO DE LAS PROPIEDADES DEL USUARIO */
        nombre: string
        role: string
        clave: string
        email: string
        edad: number
        cuit: number
        id: number
        /* TIPADO DE LOS PARAMETROS DE LA FUNCION, LO QUE VA A RECIBIR */
        constructor(nombre: string, role: string, clave: string, email: string, edad: number, cuit: number, id: number){
            this.nombre = nombre
            this.role = role
            this.clave = clave
            this.email = email
            this.edad = edad
            this.cuit = cuit
            this.id = id     
        }
    }

    const usuario_1: Usuario = new Usuario('pepe', 'admin', '123', 'pepe@gmail.com', 72, 9187151687,5)
    console.log(usuario_1)

    class ManejadorUsuarios {
        usuarios: Usuario[]
        id_conter: number
        constructor(){
            this.usuarios= []
            this.id_conter=0
        }
        agregarUsuario(nombre: string, role: string, clave:string, email:string, edad:number, cuit:number){
            const nuevo_usuario : Usuario= new Usuario(nombre, role, clave, email, edad, cuit, this.id_conter++)
            this.usuarios.push(nuevo_usuario)
        }
    }

    const manejador_usuarios : ManejadorUsuarios = new ManejadorUsuarios()
    manejador_usuarios.agregarUsuario('pepe', 'admin', '242424', 'holahola@gmail.com', 23, 4848746)

    console.log(manejador_usuarios)