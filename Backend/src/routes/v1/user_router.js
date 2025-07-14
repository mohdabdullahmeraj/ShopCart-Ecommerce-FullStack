const express = require("express")
const { UserController } = require("../../controllers")
const {signUpUser, loginUser, logoutUser} = UserController

const userRouter = express.Router()

userRouter.post('/signup', signUpUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)

module.exports = userRouter