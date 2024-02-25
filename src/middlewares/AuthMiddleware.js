const AuthService = require("../modules/auth/auth-service")
const { ApiError } = require("./ApiError")
const jwt = require("jsonwebtoken")

const AuthMiddleware = {
    async checkDuplicateUser(req, res, next) {
        try {
            const res = await AuthService.getUsername(String(req.body.username).toLowerCase())

            if (res.length > 0) throw new ApiError('Username is already registered', 500)
            next()
        } catch (error) {
            next(error)
        }
    },
    async checkToken(req, res, next) {
        try {
            const bearerToken = req.header("Authorization");
            if (!bearerToken) throw new ApiError('Unauthorized', 500)
            const token = bearerToken.split(" ")[1];

            const decoded = await jwt.verify(token, process.env.JWT_SECRET, { issuer: process.env.JWT_ISSUER })

            req.userPayload = decoded
            next()
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                next('Token expired');
            } else if (error.name === 'JsonWebTokenError') {
                next('Invalid token');
            } next(error)
        }
    },
    async adminAccess(req, res, next) {
        try {
            const { role_id } = req.userPayload
            if (role_id !== 'admin') throw new ApiError('You are not ADMIN! Access Restricted!')
            next()
        } catch (error) {
            next(error)
        }
    },
    async userAccess(req, res, next) {
        try {
            const { role_id } = req.userPayload
            if (role_id !== 'user') throw new ApiError('You are not USER! Access Restricted!')
            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthMiddleware