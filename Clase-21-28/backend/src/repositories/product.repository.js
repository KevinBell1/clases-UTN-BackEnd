
import pool from '../config/dbMysql.config.js';
import Product from '../models/products.model.js'

class ProductRepostory{

    static async createProduct(new_product_data){
        const {title, price, stock, description, category, seller_id, image_base64} = new_product_data
        const query =  `INSERT INTO Products (title, price, stock, description, category, seller_id, image_base64) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const response = await pool.execute(query, [title, price, stock, description, category, seller_id, image_base64])
        console.log(response)
    }

    static async updateProduct(product_id, updated_data){

    }

    static async getAllProducts(){
        const [rows] = await pool.execute('SELECT * FROM Products WHERE active = true')
        return rows
    }

    static async getProductById(product_id){
        const [rows] = await pool.execute('SELECT * FROM Products WHERE id = ?', [product_id])
        return rows.length > 0 ? rows[0] : null
    }

    static async deleteProduct(product_id){

    }
}


export default ProductRepostory

// class ProductRepostory{

//     static async createProduct(new_product_data){
//         const new_product = new Product(new_product_data)
//         return await new_product.save()
//     }

//     static async updateProduct(product_id, updated_data){
//         return Product.findByIdAndUpdate(product_id, updated_data)
//     }

//     static async getAllProducts(){
//         return Product.find({active: true})
//     }

//     static async getProductById(product_id){
//         return Product.findById(product_id)
//     }

//     static async deleteProduct(product_id){
//         //El {new: true} indica que debe devolver el producto actualizado
//         return Product.findByIdAndUpdate(product_id, {active: false},{new: true})
//     }
// }
