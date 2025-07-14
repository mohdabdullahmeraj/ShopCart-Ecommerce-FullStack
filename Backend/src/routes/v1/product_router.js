const express = require('express')
const { ProductController } = require('../../controllers')
const {createProduct, getProducts, getProduct, deleteProduct, createProductWithImages, addReview} = ProductController

const {createProductValidator} = require('../../middlewares/product_middlewares')
const productRouter = express.Router()

productRouter.post('/', createProductValidator, createProduct)
productRouter.post("/with-images", createProductWithImages);
productRouter.get('/', getProducts)
productRouter.get('/:id', getProduct)
productRouter.delete('/:id', deleteProduct)
productRouter.post('/:id/reviews', addReview)


module.exports = productRouter