const { internalServerError } = require("../errors/internal_server_error")
const { notFound } = require("../errors/not_found_error")

class CategoryService {
    constructor (repository, productRepository){
        this.repository = repository
        this.productRepository = productRepository
    }
    
    createCategory = async(category) => {
        try{
            const response = await this.repository.createCategory(category.name, category.description)
            return response
    
        }catch(err){
            console.log("CategoryService: ",err)
            throw new internalServerError()
        }
    }

    getCategories = async() => {
        try{
            const response = await this.repository.getCategories()
            return response
        }catch(err){
            console.log("CategoryService: ",err)
            throw new internalServerError()
        }
    }

    getCategory = async(categoryId) => {
        try{
            const response = await this.repository.getCategory(categoryId)
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


    deleteCategory = async(categoryId) => {
        try{
            const response = await this.repository.deleteCategory(categoryId)
            if(!response){
                console.log("CategoryService: ", categoryId, "not found")
                throw new notFound("Category", "id", categoryId)
            } 
            return response

        }catch(err){
            if(err.name == "NotFoundError"){
                throw err
            }
            console.log("CategoryService: ",err)
            throw new internalServerError()
        }
    }

    getProductsByCategory = async(categoryId) => {
        try{
            await this.repository.getCategory(categoryId)
            const response = await this.productRepository.getProductsByCategory(categoryId)
            return response
        }catch(err){
            if(err.name === "NotFoundError"){
                throw err
            }
            console.log("CategoryService: ", err)
            throw new internalServerError()
        }
    }
}



module.exports = CategoryService

