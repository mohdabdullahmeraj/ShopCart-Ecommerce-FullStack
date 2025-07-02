const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const ProductService = require('../services/product_service')
const FakeStoreRepository = require("../repositories/fake_store_repository")

const productService = new ProductService(new FakeStoreRepository)

const createProduct = async(req, res) => {

    try{

        const response = await productService.createProduct(req.body)
        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                error: {},
                message: ReasonPhrases.CREATED +' Product',
                data: response
        })



    }catch(err){
        console.log("Something happened", err)
    }

}

const getProducts = async (req, res) =>{
    try{

        const response = await productService.getProducts()
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: 'Successfully fetched Products',
                data: response
        })

    }catch(err){
        console.log("Something went wrong", err)
    }
}

const getProduct = async (req, res) => {
    try{

       const response = await productService.getProduct(req.params.id)
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: 'Successfully fetched Product',
                data: response
        }) 

    }catch(err){
        console.log("Something happened", err)
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProduct
}