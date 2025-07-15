const { badRequest } = require('../errors/bad_request_error')
const {errorResponse} = require('../utils/error_response')
const {StatusCodes, ReasonPhrases} = require('http-status-codes')

createCartValidator = (req, res, next) => {
    if(!req.body.productId){
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorResponse(ReasonPhrases.BAD_REQUEST, new badRequest('ProductId')))
    }

    if(!req.body.quantity){
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorResponse(ReasonPhrases.BAD_REQUEST, new badRequest('Quantity')))
    }
    next() 
}

module.exports = {
    createCartValidator
}