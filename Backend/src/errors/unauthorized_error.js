const { ReasonPhrases, StatusCodes } = require("http-status-codes")

class unauthorizedError extends Error{
    constructor(){
        const errorMessage = `You are not authorized`
        super(errorMessage)
        this.statusCode = StatusCodes.UNAUTHORIZED
        this.reason = ReasonPhrases.UNAUTHORIZED
        this.errorMessage = errorMessage
        this.name = "UnauthorizedError"
    }

}

module.exports = {
    unauthorizedError
}