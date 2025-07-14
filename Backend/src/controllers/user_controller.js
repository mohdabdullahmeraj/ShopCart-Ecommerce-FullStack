const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const UserRepository = require("../repositories/user_repository");
const UserService = require("../services/user_service");
const { errorResponse } = require("../utils/error_response");

const userService = new UserService(new UserRepository())

const signUpUser = async(req, res) => {
    try{
        const {token, user} = await userService.signupUser(req.body)
        res.cookie("token", token)
         
        const { password, ...safeUser } = user.dataValues;
        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                error: {},
                message: "Succesfully signed up",
                data: safeUser
            })

    }catch(err){
        console.log("User Controller: Something happened", err);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, err));

    }
}

const loginUser = async(req, res) => {
    try{
        const {token, user} = await userService.loginUser(req.body)
        res.cookie("token", token)

        // const { password, ...safeUser } = user.dataValues;
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: "Succesfully logged in",
                data: {token,
                    ...user
                }
            })


    }catch(err){
        console.log("User Controller: Something happened", err);
        return res  
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, err))
        
    }
}

const logoutUser = async(req,res) => {
    try{
        res.clearCookie("token")
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: "Successfully logged out",
                data: {}

            })
    }catch(err){
        console.log("User Controller: Something happened", err);
        return res  
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, err))
    }
}

module.exports = {
    signUpUser,
    loginUser,
    logoutUser
}