import AppError from "../helpers/errors/app.error.js";
import ProductRepostory from "../repositories/product.repository.js";

export const createProductController = async (req, res) => {
    try {
        const new_product = req.body; // Recibe directamente el cuerpo
        console.log(new_product)  //ESTE SE CONSOLOGUEA
        if (!new_product.title || !new_product.price || !new_product.stock) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        const product = await ProductRepostory.createProduct(new_product);
        console.log(product) //ESTE NO, ME DIRIGE AL CATCH
        res.status(201).json(product)
    } catch (error) {
        console.error('Detalles del error:', error.message, error.stack);
        res.status(500).json({
            message: 'Error interno del servidor', 
            error: error.message,
            stack: error.stack,
        });
    }
}
export const deleteProductController = async (req, res) => {
    try {
        const { product_id } = req.params
        if (!product_id) {
            return res.status(404).json({ message: "No se ha encontrado el id del producto" })
        }
        const product = await ProductRepostory.deleteProduct(product_id)
        if (product) {
            return res.status(200).json({ message: 'Producto eliminado correctamente' })
        } else {
            return res.status(404).json({ message: 'No se ha encontrado el producto' })
        }
    } catch (error) {

        return res.status(500).json({ message: error })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { product_id } = req.params
        const { updated_data } = req.body
        if (!product_id || !updated_data) {
            return res.status(404).json({ message: 'Los campos son obligatorios' })
        }
        const updatedProduct = await ProductRepostory.updateProduct(product_id, updated_data)
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        } else {
            return res.status(200).json({ message: 'Producto actualizado a ' + updatedProduct })
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
}

export const getProductByIdController = async (req, res, next) => {
    try {
        const { product_id } = req.params
        if (!product_id) {
            return next(new AppError('Se necesita un product_id', 400))
        }
        const product = await ProductRepostory.getProductById(product_id)
        if (product) {
            return res.status(200).json({ product })
        } else {
            //le puedo pasar a next a quien ejecutar
            return next(new AppError('Producto no encontrado', 404))
        }
    } catch (error) {
        console.error(error)
        next(error) //no devolvemos nada al front end y le enviamos el error a la consola del back en middleware
    }
}
export const getAllProductsController = async (req, res) => {
    try {
        const products = await ProductRepostory.getAllProducts()
        return res.status(200).json({ products })
    } catch (error) {
        return res.status(500).json("error.message")
    }
}



