module.exports = (req, res, next) => {
  const { googleId, name, email } = req.body;
  if (!googleId || !name || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  next();
};
// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",

    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
