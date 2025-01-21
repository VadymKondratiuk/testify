class ApiError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }

    static notAuthorize() {
        return new ApiError(401, 'User is not authorize')
    }

    static noAccess(){
        return new ApiError(400, 'Access denied') //check status code
    }
}

module.exports = ApiError