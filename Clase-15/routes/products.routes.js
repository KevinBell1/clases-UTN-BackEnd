import express, { response } from 'express'
import filesystem from 'fs'
import responseBuilder from '../builders/response.builder.js'

const productRouter = express.Router()

export const productos = JSON.parse(await filesystem.promises.readFile("./data/products.json", {encoding: "utf-8"}))



import { deleteProductControler, getAllProductsControler, getProductByIdControler, postProductControler, putProductControler } from '../controlers/products.controle.js'

productRouter.get('/:product_id', getProductByIdControler)
productRouter.get('/', getAllProductsControler)
productRouter.post("/", postProductControler)
productRouter.put("/:product_id", putProductControler)
productRouter.delete('/:product_id', deleteProductControler)

export default productRouter