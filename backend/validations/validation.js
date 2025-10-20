const validator = require('validator');
const { errorResponse } = require('../utils/response');

const validateMessage = (req, res, next) => {
    const { name, email, message } = req.body;

    // Check if all fields are present
    if (!name || !email || !message) {
        return errorResponse(res, 'All fields (name, email, message) are required', 400);
    }

    // Validate name
    if (typeof name !== 'string' || name.trim().length === 0) {
        return errorResponse(res, 'Name must be a non-empty string', 400);
    }

    if (name.length > 100) {
        return errorResponse(res, 'Name cannot exceed 100 characters', 400);
    }

    // Validate email
    if (!validator.isEmail(email)) {
        return errorResponse(res, 'Please provide a valid email address', 400);
    }

    if (email.length > 255) {
        return errorResponse(res, 'Email cannot exceed 255 characters', 400);
    }

    // Validate message
    if (typeof message !== 'string' || message.trim().length === 0) {
        return errorResponse(res, 'Message must be a non-empty string', 400);
    }

    if (message.length > 1000) {
        return errorResponse(res, 'Message cannot exceed 1000 characters', 400);
    }

    // Sanitize inputs
    req.body.name = validator.escape(name.trim());
    req.body.email = validator.normalizeEmail(email.trim());
    req.body.message = validator.escape(message.trim());

    next();
};

module.exports = {
    validateMessage
};