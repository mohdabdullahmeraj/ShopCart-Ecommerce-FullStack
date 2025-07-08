const Admin  = require("../models/admin");

class AdminRepository {
    createAdmin = async(name, email, password) => {
        try{
            const response = await Admin.create({
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
    
    findAdminByEmail = async(email) => {
        try{
            const response = await Admin.findOne({
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

module.exports = AdminRepository