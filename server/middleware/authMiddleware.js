const ApiError = require('../errors/ApiError')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        
        if(!token) {
            return next(ApiError.notAuthorize())
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    }
    catch(err) {
        return next(ApiError.notAuthorize())
    }
}