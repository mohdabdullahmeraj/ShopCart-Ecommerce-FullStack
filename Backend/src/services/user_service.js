const { badRequest } = require("../errors/bad_request_error");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config/serverConfig");
const { internalServerError } = require("../errors/internal_server_error");

class UserService{
    constructor(repository){
        this.repository = repository
    }

    signupUser = async(user) => {
        try{
            if(await this.repository.findUserByEmail(user.email)){
                console.log("UserService: Already Registered");
                throw new badRequest("User already registered")
            }
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword

            const newUser = await this.repository.createUser(user.name, user.email, user.password)

            const token = jwt.sign({id: newUser.id},JWT_SECRET)  
            return {token, user: newUser}

        }catch(err){
            console.log("UserService: ",err)
            throw new internalServerError()
        }
    }

    loginUser = async(user) => {
        try{
            const existingUser = await this.repository.findUserByEmail(user.email)
            if(!existingUser){
                console.log("UserService: Something went wrong");
                throw new badRequest("Email or password is incorrect")
                
            }
            const isPasswordCorrect = await bcrypt.compare(user.password, existingUser.password)
            if(!isPasswordCorrect){
                throw new badRequest("Email or password is incorrect")
            }

            const token = jwt.sign({id: existingUser.id}, JWT_SECRET)

            const { password, ...safeUser } = existingUser.dataValues;
            return { token, user: safeUser };




            
        }catch(err){
            console.log("UserService: ",err)
            throw new internalServerError()
        }
    }
}

module.exports = UserService