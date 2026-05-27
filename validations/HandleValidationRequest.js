const { validationResult } = require("express-validator");


const HandleValidationRequest = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.mapped() });
    }
    next();
};

module.exports = HandleValidationRequest;