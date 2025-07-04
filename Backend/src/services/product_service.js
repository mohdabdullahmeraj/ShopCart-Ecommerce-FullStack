const { internalServerError } = require("../errors/internal_server_error")
const { notFound } = require("../errors/not_found_error")

class ProductService {
    constructor (repository){
        this.repository = repository
    }
    createProduct = async(product) => {
        try{
            const response = await this.repository.createProduct(product.title, product.description, product.price, product.categoryId, product.image)
            return response
        }catch(err){
            console.log("ProductService: ", err)
            throw new internalServerError()
        }
    }
    
    getProducts = async() => {
        try{
            const response = await this.repository.getProducts()
            return response        
        }catch(err){
            console.log("ProductService: ", err)
            throw new internalServerError()
        }
    }
    
    getProduct = async(id) => {
        try{
            const response = await this.repository.getProduct(id)
            if(!response){
                console.log("ProductService: ", id, "not found")
                throw new notFound("Product", "id", id)
            }
            return response
        }catch(err){
            if(err.name === 'NotFoundError'){
                throw err
            }
            console.log("ProductService: ", err)
            throw new internalServerError()
        }
    }

    deleteProduct = async(productId) => {
        try {
            const response = await this.repository.deleteProduct(productId);
            if(!response) {
                console.log("ProductService: ", productId, "not found");
                throw new notFound("Product", "id", productId);
            }
            return response;
        } catch(error) {
            if(error.name === "NotFoundError") {
                throw error;
            }
            console.log("ProductService: ",error);
            throw new internalServerError();
        }
    }
}



module.exports = ProductService

