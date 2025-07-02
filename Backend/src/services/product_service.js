class ProductService {
    constructor (repository){
        this.repository = repository
    }
    createProduct = async(product) => {
        const response = await this.repository.createProduct(product)
        return response
    }
    
    getProducts = async() => {
        const response = await this.repository.getProducts()
        return response        
    }
    
    getProduct = async(id) => {
        const response = await this.repository.getProduct(id)
        return response
    }
}



module.exports = ProductService

