const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const AdminRepository = require("../repositories/admin_repository");
const AdminService = require("../services/admin_service");
const { errorResponse } = require("../utils/error_response");

const adminService = new AdminService(new AdminRepository())

const signUpAdmin = async(req, res) => {
    try{
        const {token, admin} = await adminService.signupAdmin(req.body)
        res.cookie("token", token)
         
        const { password, ...safeAdmin } = admin.dataValues;
        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                error: {},
                message: "Succesfully signed up",
                data: safeAdmin
            })

    }catch(err){
        console.log("Admin Controller: Something happened", err);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, err));

    }
}

const loginAdmin = async(req, res) => {
    try{
        const {token, admin} = await adminService.loginAdmin(req.body)
        res.cookie("token", token)

        // const { password, ...safeAdmin } = admin.dataValues;
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: "Succesfully logged in",
                data: {token,
                    ...admin
                }
            })


    }catch(err){
        console.log("Admin Controller: Something happened", err);
        return res  
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, err))
        
    }
}

const logoutAdmin = async(req,res) => {
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
        console.log("Admin Controller: Something happened", err);
        return res  
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, err))
    }
}

module.exports = {
    signUpAdmin,
    loginAdmin,
    logoutAdmin
}