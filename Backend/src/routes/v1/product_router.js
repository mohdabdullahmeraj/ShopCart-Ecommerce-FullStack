const express = require('express')
const { ProductController } = require('../../controllers')
const {createProduct, getProducts, getProduct, deleteProduct, createProductWithImages, addReview} = ProductController

const {createProductValidator} = require('../../middlewares/product_middlewares')
const { verifyToken } = require('../../middlewares/auth_middleware')
const { verifyRole } = require('../../middlewares/role_middleware')
const productRouter = express.Router()

productRouter.post('/', createProductValidator, verifyToken,verifyRole(['admin']), createProduct)
productRouter.post("/with-images", verifyToken, verifyRole(['admin']), createProductWithImages);
productRouter.delete('/:id', verifyToken, verifyRole(['admin']), deleteProduct)

productRouter.get('/', getProducts)
productRouter.get('/:id', getProduct)

productRouter.post('/:id/reviews',verifyToken, verifyRole(['user']), addReview)


module.exports = productRouter