const express = require('express')
const { OrderController } = require('../../controllers')
const { verifyToken } = require('../../middlewares/auth_middleware')
const { verifyRole } = require('../../middlewares/role_middleware')
const { createOrder, getOrdersByUser, getOrderById, getAllOrders } = OrderController

const orderRouter = express.Router()

orderRouter.post('/', verifyToken, verifyRole(['user']), createOrder)
orderRouter.get('/me', verifyToken, verifyRole(['user']), getOrdersByUser)
orderRouter.get("/:orderId", verifyToken, verifyRole(["user", "admin"]), getOrderById)
orderRouter.get("/", verifyToken, verifyRole(["admin"]), getAllOrders)

module.exports = orderRouter