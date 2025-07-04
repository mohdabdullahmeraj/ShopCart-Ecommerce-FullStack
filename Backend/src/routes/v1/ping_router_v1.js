const express = require('express')

const { PingController } = require('../../controllers/index')
const { pingCheck } = PingController

const router = express.Router()

router.get('/', pingCheck)

module.exports = router