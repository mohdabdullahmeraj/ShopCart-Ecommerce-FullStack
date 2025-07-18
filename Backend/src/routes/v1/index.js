const express = require('express')

const v1Router = express.Router()

const pingRouterV1 = require('./ping_router_v1')
const productRouter = require('./product_router')
const categoryRouter = require('./category_router')
const adminRouter = require('./admin_router')
const userRouter = require('./user_router')
const cartRouter = require('./cart_router')
const OrderRouter = require('./order_router')

v1Router.use('/ping', pingRouterV1)
v1Router.use('/products', productRouter)
v1Router.use('/categories', categoryRouter)
v1Router.use('/admin', adminRouter)
v1Router.use('/user', userRouter)
v1Router.use('/cart', cartRouter)
v1Router.use('/orders', OrderRouter)


module.exports = v1Router