module.exports = (req, res, next) => {
  const { googleId, name, email } = req.body;
  if (!googleId || !name || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  next();
};
