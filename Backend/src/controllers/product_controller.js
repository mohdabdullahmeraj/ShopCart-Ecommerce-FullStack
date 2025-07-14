const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const ProductService = require('../services/product_service')
const ProductRepository = require('../repositories/product_repository')
const { errorResponse } = require("../utils/error_response")

const productService = new ProductService(new ProductRepository)

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
        console.log("Product Controller: Something happened", err)
        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))
    }

}

const getProducts = async (req, res) =>{
    try{

        const response = await productService.getProducts(req.query)
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: 'Successfully fetched Products',
                data: response
        })

    }catch(err){
        console.log("Product Controller: Something happened", err)
        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))
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
        console.log("Product Controller: Something happened", err)
        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))
    }
}

const deleteProduct = async(req, res) => {
    try{

        const response = await productService.deleteProduct(req.params.id)
        return res
            .status(StatusCodes.OK)
            .json({
                success:true,
                error: {},
                message: "Successfully deleted product",
                data: response
            })

    }catch(err){
        console.log("Product Controller: Something happened", err)
        return res
            .status(error.statusCode)
            .json(errorResponse(err.reason, err))
    }
}

const createProductWithImages = async(req, res) => {
    try{
        const response = await productService.createProductWithImages(req.body)
        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                error: {},
                message: ReasonPhrases.CREATED + " Product with Images",
                data: response    
            })
    }catch(err){
        console.log("Product Controller: Something happened", err)
        return res
            .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errorResponse(err.reason || ReasonPhrases.INTERNAL_SERVER_ERROR, err));
    }
}

const addReview = async (req, res) => {
  try {
    const { user, comment } = req.body
    const { id: productId } = req.params
    const response = await productService.addReview(productId, user, comment)

    return res.status(StatusCodes.CREATED).json({
      success: true,
      error: {},
      message: "Review added",
      data: response
    })

  } catch (err) {
    console.log("Product Controller: Something happened", err)
    return res.status(err.statusCode).json(errorResponse(err.reason, err))
  }
}


module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    createProductWithImages,
    addReview
}