const { successResponse } = require("../../helpers/response")

const MenuController = {
    helloWordMenu(req, res, next) {
        try {
            successResponse(res, [], "Hello World")
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MenuController