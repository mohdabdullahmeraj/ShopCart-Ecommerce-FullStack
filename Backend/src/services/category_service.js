const { internalServerError } = require("../errors/internal_server_error")
const { notFound } = require("../errors/not_found_error")

class CategoryService {
    constructor (repository){
        this.repository = repository
    }
    
    createCategory = async(category) => {
        try{
            const response = await this.repository.createCategory(category.name, category.description)
            return response
    
        }catch(err){
            console.log("CategoryService: ",err)
            throw new internalServerError
        }
    }

    getCategories = async() => {
        try{
            const response = await this.repository.getCategories()
            return response
        }catch(err){
            console.log("CategoryService: ",err)
            throw new internalServerError
        }
    }

    getCategory = async(id) => {
        try{
            const response = await this.repository.getCategory(id)
            if(!response) { 
                console.log("CategoryService: ", categoryId, "not found");
                throw new notFound("Category", "id", categoryId);
            }
            return response;
        }catch(err){
            if(err.name === "NotFoundError") {
                throw err;
            }
            console.log("CategoryService: ",err);
            throw new internalServerError();
        }
    }


    deleteCategory = async(categoryID) => {
        try{
            const response = await this.repository.deleteCategory(categoryID)
            return response

        }catch(err){
            console.log("CategoryService: ",err)
            throw new internalServerError
        }
    }
}



module.exports = CategoryService

