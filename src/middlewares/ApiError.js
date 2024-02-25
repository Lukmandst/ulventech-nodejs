
const errorHandler = (err, req, res, next) => {
    // console.log(err.message);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        data: [],
        message: err.message
    });
}


class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { errorHandler, ApiError }