const { badRequest } = require("../errors/bad_request_error")
const { internalServerError } = require("../errors/internal_server_error")
const { notFound } = require("../errors/not_found_error")

class ProductService {
    constructor (repository){
        this.repository = repository
    }
    createProduct = async(product) => {
        try{
            const response = await this.repository.createProduct(product.title, product.description, product.price, product.categoryId)
            return response
        }catch(err){
            console.log("ProductService: ", err)
            throw new internalServerError()
        }
    }
    
    getProducts = async(query) => {
        try{
            if(query.limit && isNaN(query.limit) || query.offset && isNaN(query.offset)){
                throw new badRequest("limit, offset", true)
            }
            if(query.min_price && isNaN(query.min_price)){
                throw new badRequest("min_price", true)
            }

            if(query.max_price && isNaN(query.max_price)){
                throw new badRequest("max_price", true)
            }
            if(query.category && isNaN(query.category)){
                throw new badRequest("category", true)
            }

            let sortBy = query.sort_by
            let sortOrder = query.sort_order

            const validSortFields = ['title', 'price', 'createdAt']
            const validSortOrders = ['asc', 'desc']

            if(!validSortFields.includes(sortBy)){
                sortBy = 'createdAt'
            }
            if(!validSortOrders.includes(sortOrder)){
                sortOrder = 'desc'
            }

            const response = await this.repository.getProducts(+query.limit, +query.offset, +query.min_price, +query.max_price, +query.category, query.search, sortBy, sortOrder)
            return response        
        }catch(err){
            if(err.name === "BadRequest"){
                throw err 
            }
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

    createProductWithImages = async(data) => {
        try{
            const {title, description, price, categoryId, images} = data

            const product = await this.repository.createProduct(title, description, price, categoryId)
            if(images && images.length > 0){
                let hasMain = false

                for(let img of images){
                    const isMain = img.isMain === true

                    if(isMain){
                        if(hasMain){
                            throw new badRequest('Only one image can be marked as main')
                        }
                        hasMain = true
                    }
                    await this.repository.addProductImage(product.id, img.imgUrl, isMain);
                }

                if (!hasMain && images.length > 0) {
                    await this.repository.addProductImage(product.id, images[0].imgUrl, true);
                }

                return {
                    product,
                    images: await this.repository.getProductImages(product.id)
                }
            }
        }catch(err){
            console.log("ProductService: ",error);
            throw new internalServerError();
        }
    }
}



module.exports = ProductService

