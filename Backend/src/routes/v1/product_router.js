const express = require('express')
const { ProductController } = require('../../controllers')
const {createProduct, getProducts, getProduct, deleteProduct, createProductWithImages, addReview} = ProductController

const {createProductValidator} = require('../../middlewares/product_middlewares')
const { verifyToken } = require('../../middlewares/auth_middleware')
const productRouter = express.Router()

productRouter.post('/', createProductValidator, verifyToken, createProduct)
productRouter.post("/with-images", verifyToken, createProductWithImages);
productRouter.get('/', getProducts)
productRouter.get('/:id', getProduct)
productRouter.delete('/:id', verifyToken, deleteProduct)
productRouter.post('/:id/reviews', addReview)


module.exports = productRouter