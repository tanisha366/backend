// Standardized response format
const successResponse = (res, message, data = null, statusCode = 200) => {
    const response = {
        success: true,
        message: message,
        timestamp: new Date().toISOString()
    };

    if (data !== null) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

const errorResponse = (res, message, statusCode = 400, errors = null) => {
    const response = {
        success: false,
        message: message,
        timestamp: new Date().toISOString()
    };

    if (errors !== null) {
        response.errors = errors;
    }

    return res.status(statusCode).json(response);
};

module.exports = {
    successResponse,
    errorResponse
};