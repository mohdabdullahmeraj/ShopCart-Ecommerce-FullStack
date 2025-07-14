const { badRequest } = require("../errors/bad_request_error");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config/serverConfig");
const { internalServerError } = require("../errors/internal_server_error");

class AdminService{
    constructor(repository){
        this.repository = repository
    }

    signupAdmin = async(admin) => {
        try{
            if(await this.repository.findAdminByEmail(admin.email)){
                console.log("AdminService: Already Registered");
                throw new badRequest("Admin already registered")
            }
            const hashedPassword = await bcrypt.hash(admin.password, 10);
            admin.password = hashedPassword

            const newAdmin = await this.repository.createAdmin(admin.name, admin.email, admin.password)

            const token = jwt.sign({id: newAdmin.id, role: 'admin'},JWT_SECRET)  
            return {token, admin: newAdmin}

        }catch(err){
            console.log("AdminService: ",err)
            throw new internalServerError()
        }
    }

    loginAdmin = async(admin) => {
        try{
            const existingAdmin = await this.repository.findAdminByEmail(admin.email)
            if(!existingAdmin){
                console.log("AdminService: Something went wrong");
                throw new badRequest("Email or password is incorrect")
                
            }
            const isPasswordCorrect = await bcrypt.compare(admin.password, existingAdmin.password)
            if(!isPasswordCorrect){
                throw new badRequest("Email or password is incorrect")
            }

            const token = jwt.sign({id: existingAdmin.id, role: 'admin'}, JWT_SECRET)

            const { password, ...safeAdmin } = existingAdmin.dataValues;
            return { token, admin: safeAdmin };




            
        }catch(err){
            console.log("AdminService: ",err)
            throw new internalServerError()
        }
    }
}

module.exports = AdminService