const User  = require("../models/user");

class UserRepository {
    createUser = async(name, email, password) => {
        try{
            const response = await User.create({
                name,
                email,
                password
            })
            return response

        }catch(err){
            console.log(err);
            throw err
            
        }
    }
    
    findUserByEmail = async(email) => {
        try{
            const response = await User.findOne({
                where: {
                    email: email
                }
            })

            return response

        }catch(err){
            console.log(err);
            throw err
            
        }
    }
}

module.exports = UserRepository