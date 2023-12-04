export const ErrorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err._message || err.message || "Internal server error";
  console.log({err})
    if (err.name === "ValidationError") {
      // Handling MongoDB validation errors
      statusCode = 422; // Unprocessable Entity
      const validationErrors = Object.values(err.errors).map((error) => error.message);
      message = validationErrors[0] || "Validation error";
      res.status(statusCode).json({
        success: false,
        message,
        error: validationErrors,
      });
    } else {
      // Handling other errors
      res.status(statusCode).json({
        success: false,
        message,
      });
    }
  };