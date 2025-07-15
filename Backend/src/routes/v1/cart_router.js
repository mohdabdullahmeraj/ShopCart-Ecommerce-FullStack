const express = require('express')
const { CartController } = require('../../controllers')
const { verifyToken } = require('../../middlewares/auth_middleware')
const { verifyRole } = require('../../middlewares/role_middleware')
const { addToCart, removeFromCart, getCart, clearCart, updateQuantity  } = CartController
const { createCartValidator } = require('../../middlewares/cart_middlewares')

const cartRouter = express.Router()

cartRouter.get('/', verifyToken, verifyRole(['user']), getCart)
cartRouter.post('/add',createCartValidator, verifyToken, verifyRole(['user']), addToCart)
cartRouter.put('/update', verifyToken, verifyRole(['user']), updateQuantity)
cartRouter.delete('/remove', verifyToken, verifyRole(['user']), removeFromCart)
cartRouter.delete('/clear', verifyToken, verifyRole(['user']), clearCart)

module.exports = cartRouter