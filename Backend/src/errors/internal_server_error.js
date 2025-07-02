const { ReasonPhrases, StatusCodes } = require("http-status-codes")

class internalServerError extends Error{
    constructor(propetyMissing){
        const errorMessage = `${propetyMissing} is missing from the request body`
        super(errorMessage)
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
        this.reason = ReasonPhrases.INTERNAL_SERVER_ERROR
        this.errorMessage = errorMessage
        this.name = "InternalServerError"
    }

}

module.exports = {
    internalServerError
}