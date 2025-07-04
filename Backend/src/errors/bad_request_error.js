const { ReasonPhrases, StatusCodes } = require("http-status-codes")

class badRequest extends Error{
    constructor(propertyMissing){
        const errorMessage = `${propertyMissing} is missing from the request body`
        super(errorMessage)
        this.statusCode = StatusCodes.BAD_REQUEST
        this.reason = ReasonPhrases.BAD_REQUEST
        this.errorMessage = errorMessage
        this.name = "BadRequest"
    }

}

module.exports = {
    badRequest
}