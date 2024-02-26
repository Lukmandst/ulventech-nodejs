const { successResponse } = require("../../helpers/response");
const { ApiError } = require("../../middlewares/ApiError");
const AuthService = require("./auth-service");


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const AuthController = {
    async signUpUser(req, res, next) {
        try {
            const { username, password } = req.body
            if (!username || !password) throw new ApiError('username or password cant be empty!', 500)
            const regex = /^[a-z0-9]+$/i
            if (!regex.test(username)) throw new ApiError('only allowed alphanumeric', 500)

            const hashed = await bcrypt.hash(password, 9)

            const data = { username: String(username).toLowerCase(), password: hashed, role_id: 2 }

            const result = await AuthService.postUsername(data)
            return successResponse(res, [], `${req.body.username} successfully registered`)
        } catch (error) {
            next(error)
        }
    },
    async signUpAdmin(req, res, next) {
        try {
            const { username, password } = req.body
            if (!username || !password) throw new ApiError('username or password cant be empty!', 500)
            const regex = /^[a-z0-9]+$/i
            if (!regex.test(username)) throw new ApiError('only allowed alphanumeric', 500)

            const hashed = await bcrypt.hash(password, 9)

            const data = { username: String(username).toLowerCase(), password: hashed, role_id: 1 }

            const result = await AuthService.postUsername(data)
            return successResponse(res, [], `${req.body.username} successfully registered`)
        } catch (error) {
            next(error)
        }
    },
    async signInUser(req, res, next) {
        try {
            const { username, password } = req.body
            if (!username || !password) throw new ApiError('username or password cant be empty!', 500)
            const regex = /^[a-z0-9]+$/i
            if (!regex.test(username)) throw new ApiError('only allowed alphanumeric', 500)

            const userData = await AuthService.getUserByName(username.toLowerCase())

            if (!userData || userData.length === 0) throw new ApiError("Username or Password is invalid!", 500)
            const role_id = userData.role_id
            const verify = await bcrypt.compare(password, userData.password);
            if (!verify) throw new ApiError("Username or Password is invalid!", 500)

            const payload = {
                id: userData.id,
                username: username.toLowerCase(),
                role_id,
            };
            const jwtOptions = {
                issuer: process.env.JWT_ISSUER,
                expiresIn: "1d",
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOptions);
            successResponse(res, { username, role_id, token }, 'Login Success')
        } catch (error) {
            next(error)
        }
    }

}

module.exports = AuthController