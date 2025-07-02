const { ReasonPhrases, StatusCodes } = require("http-status-codes")

class notFound extends Error{
    constructor(propetyMissing){
        const errorMessage = `${propetyMissing} is missing from the request body`
        super(errorMessage)
        this.statusCode = StatusCodes.NOT_FOUND
        this.reason = ReasonPhrases.NOT_FOUND
        this.errorMessage = errorMessage
        this.name = "NotFoundError"
    }

}

module.exports = {
    notFound
}