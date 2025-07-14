const {unauthorizedError} = require('../errors/unauthorized_error')
const {errorResponse} = require('../utils/error_response')
const {StatusCodes, ReasonPhrases} = require('http-status-codes')
const { JWT_SECRET } = require("../config/serverConfig");
const jwt =require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization    

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(StatusCodes.UNAUTHORIZED).json(
            errorResponse(ReasonPhrases.UNAUTHORIZED, new unauthorizedError())
        );
    }
    
    const token = req.headers.authorization.split(' ')[1]

    try{
        const payload = jwt.verify(token, JWT_SECRET)
        req.user = payload
        next()
    }catch(err){
        return res  
            .status(StatusCodes.UNAUTHORIZED)
            .json(errorResponse(ReasonPhrases.UNAUTHORIZED, new unauthorizedError()))
    }
}

module.exports = {
    verifyToken
}