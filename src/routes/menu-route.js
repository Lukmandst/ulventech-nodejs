const express = require('express')
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const MenuController = require('../modules/menu/menu-controller')

const router = express.Router()

// /menu/..
module.exports = function () {

    router.get('/user-menu', AuthMiddleware.checkToken, AuthMiddleware.userAccess, MenuController.helloWordMenu)
    router.get('/admin-menu', AuthMiddleware.checkToken, AuthMiddleware.adminAccess, MenuController.helloWordMenu)
    router.get('/', MenuController.helloWordMenu)
    return router
}