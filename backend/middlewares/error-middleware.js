import { RESPONSE_MESSAGES } from "../utils/constants.js";

const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
        errors: err.errors || [],
    });
};

export default errorMiddleware
