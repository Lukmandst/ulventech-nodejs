const express = require('express')
const AuthController = require('../modules/auth/auth-controller')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

const router = express.Router()


// /auth/...
module.exports = function () {

    router.post('/admin-signup', AuthMiddleware.checkDuplicateUser, AuthController.signUpAdmin)
    router.post('/signup', AuthMiddleware.checkDuplicateUser, AuthController.signUpUser)
    router.post('/signin', AuthController.signInUser)
    return router
}
