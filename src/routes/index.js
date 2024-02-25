const express = require('express')
const router = express.Router()

const AuthRoute = require('./auth-route')
const MenuRoute = require('./menu-route')

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to api ulventech api!' })
})

module.exports = function () {
    const routesIndex = [
        {
            path: '/auth',
            routeModule: AuthRoute
        },
        {
            path: '/menu',
            routeModule: MenuRoute
        }
    ]

    routesIndex.forEach((route) => {
        router.use(route.path, route.routeModule())
    })
    return router
}