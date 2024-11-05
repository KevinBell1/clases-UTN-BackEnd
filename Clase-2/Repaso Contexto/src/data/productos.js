export const productos = [
    {
        id: 1,
        nombre: 'Pc Gamer',
        precio: 2000,
        stock: 2,
        categorias: ['computadoras', 'gamer', 'tecnologia'],
        imagen: 'https://guide-images.cdn.ifixit.com/igi/BCU4AgbFicGvFcZA.large'
    },
    {
        id: 2,
        nombre: 'Mouse Gamer',
        precio: 500,
        stock: 7,
        categorias: ['computadoras', 'gamer', 'tecnologia'],
        imagen: 'https://guide-images.cdn.ifixit.com/igi/BCU4AgbFicGvFcZA.large'
    },
    {
        id: 3,
        nombre: 'Teclado Gamer',
        precio: 800,
        stock: 5,
        categorias: ['computadoras', 'gamer', 'tecnologia'],
        imagen: 'https://guide-images.cdn.ifixit.com/igi/BCU4AgbFicGvFcZA.large'
    },
    {
        id: 4,
        nombre: 'Pantalla 21" Gamer',
        precio: 1000,
        stock: 4,
        categorias: ['computadoras', 'gamer', 'tecnologia'],
        imagen: 'https://guide-images.cdn.ifixit.com/igi/BCU4AgbFicGvFcZA.large'
    },
]

export const buscadorProducto = (id) => {
    return productos.find(producto => producto.id == id)
    
}