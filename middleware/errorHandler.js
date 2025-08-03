module.exports = (err, req, res, next) => {
  console.error(err.stack);

  // Use status code set in controller or default to 500
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
