const express = require("express")
const { AdminController } = require("../../controllers")
const {signUpAdmin, loginAdmin, logoutAdmin} = AdminController

const adminRouter = express.Router()

adminRouter.post('/signup', signUpAdmin)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/logout', logoutAdmin)

module.exports = adminRouter