const express = require('express')

const v1Router = express.Router()

const pingRouterV1 = require('./ping_router_v1')
const productRouter = require('./product_router')
const categoryRouter = require('./category_router')
const adminRouter = require('./admin_router')

v1Router.use('/ping', pingRouterV1)
v1Router.use('/products', productRouter)
v1Router.use('/categories', categoryRouter)
v1Router.use('/admin', adminRouter)


module.exports = v1Router