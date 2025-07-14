const {unauthorizedError} = require('../errors/unauthorized_error')
const {errorResponse} = require('../utils/error_response')
const {StatusCodes, ReasonPhrases} = require('http-status-codes')

const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        const currentRole = req.user?.role
        if(!currentRole || !allowedRoles.includes(currentRole)){
            return res 
                .status(StatusCodes.UNAUTHORIZED)
                .json(errorResponse(ReasonPhrases.UNAUTHORIZED, new unauthorizedError()))
        }
        next()
    }
}

module.exports = {
    verifyRole
}