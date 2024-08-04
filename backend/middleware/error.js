// middleware/error.js
const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //wrong mongodb id error
    if (err.name === "CastError") {
        const message = "Resource not found";
        err = new ErrorHandler(message, 404);
    }

    //mongoose duplicate key error
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        err = new ErrorHandler(message, 400);
    }

    //Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = "Json Web Token is invalid. Please try again";
        err = new ErrorHandler(message, 401);
    }

    //JWT Expire error
    if (err.name === "TokenExpiredError") {
        const message = "Json Web Token has expired. Please try again";
        err = new ErrorHandler(message, 401);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        // You might want to include the stack trace only in development mode
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};


