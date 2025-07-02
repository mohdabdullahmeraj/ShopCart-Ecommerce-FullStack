const { badRequest } = require('../errors/bad_request_error')
const {errorResponse} = require('../utils/error_response')
const {StatusCodes, ReasonPhrases} = require('http-status-codes')

createProductValidator = (req, res, next) => {
    if(!req.body.title){
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorResponse(ReasonPhrases.BAD_REQUEST, new badRequest('Title')))
    }

    if(!req.body.description){
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorResponse(ReasonPhrases.BAD_REQUEST, new badRequest('Description')))
    }

    if(!req.body.price){
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorResponse(ReasonPhrases.BAD_REQUEST, new badRequest('Price')))
    }

    if(!req.body.image){
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorResponse(ReasonPhrases.BAD_REQUEST, new badRequest('Image')))
    }

    if(!req.body.category){
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorResponse(ReasonPhrases.BAD_REQUEST, new badRequest('Category')))
    }

    next() 
}

module.exports = {
    createProductValidator
}