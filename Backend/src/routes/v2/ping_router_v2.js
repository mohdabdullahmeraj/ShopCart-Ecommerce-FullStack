const express = require('express')
const { PingController } = require('../../controllers/index')
const {pingCheckV2} = PingController

const pingRouterV2 = express.Router()

pingRouterV2.get('/', pingCheckV2)

module.exports = pingRouterV2