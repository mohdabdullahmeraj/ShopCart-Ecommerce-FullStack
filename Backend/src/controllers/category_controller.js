const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const CategoryService = require('../services/category_service')
const CategoryRepository = require("../repositories/category_repository")
const { errorResponse } = require("../utils/error_response")
const { ProductRepository } = require("../repositories")

const categoryService = new CategoryService(new CategoryRepository(), new ProductRepository())

const createCategory = async(req, res) => {

    try{

        const response = await categoryService.createCategory(req.body)
        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                error: {},
                message: ReasonPhrases.CREATED +' Category',
                data: response
        })



    }catch(err){
        console.log("Category Controller: Something happened", err)
        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))
    }

}

const getCategories = async(req, res) => {
    try{

        const response = await categoryService.getCategories()
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: "Successfully fetched categories",
                data: response
            })

    }catch(err){
        console.log("Category Controller: Something happened", err)
        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))
    }
}

const getCategory = async(req, res) => {
    try{

        const response = await categoryService.getCategory(req.params.id)
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: "Successfully fetched category",
                data: response
            })

    }catch(err){
        console.log("Category Controller: Something happened", err)
        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))    }
}


const deleteCategory = async(req, res) => {
    try{

        const response = await categoryService.deleteCategory(req.params.id)
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: "Successfully deleted category",
                data: response
            })

    }catch(err){
        console.log("Category Controller: Something happened", err)
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, err))    }   
}

const getProductsByCategory = async(req, res) => {
    try{

        const response = await categoryService.getProductsByCategory(req.params.id)
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: "Successfully fetched products for category",
                data: response
            })

    }catch(err){
        console.log("Category Controller: Something happened", err)
        console.log("Error name: ", err.name)

        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))
    }
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    deleteCategory,
    getProductsByCategory
}