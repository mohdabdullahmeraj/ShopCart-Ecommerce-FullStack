const express = require('express')
const { ProductController } = require('../../controllers')
const {createProduct, getProducts, getProduct, deleteProduct} = ProductController

const {createProductValidator} = require('../../middlewares/product_middlewares')
const productRouter = express.Router()

productRouter.post('/', createProductValidator, createProduct)
productRouter.get('/', getProducts)
productRouter.get('/:id', getProduct)
productRouter.delete('/:id', deleteProduct)

module.exports = productRouter