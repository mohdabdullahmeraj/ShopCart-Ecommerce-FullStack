const {badRequest} = require('../errors/bad_request_error')
const {errorResponse} = require('../utils/error_response')
const {StatusCodes, ReasonPhrases} = require('http-status-codes')

createCategoryValidator = (req, res, next) => {
    if(!req.body.name){
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorResponse(ReasonPhrases.BAD_REQUEST, new badRequest('Name')))
    }

    if(!req.body.description){
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorResponse(ReasonPhrases.BAD_REQUEST, new badRequest('Description')))
    }

    next() 
}

module.exports = {
    createCategoryValidator
}