// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);

  // Default to 500 if no status code is set
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    // Optional: Include stack trace only in development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};
