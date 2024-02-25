const successResponse = (res, data, message) => {
    res.status(200).json({
        success: true,
        status: 'success',
        statusCode: 200,
        data,
        message
    })
}

module.exports = { successResponse }