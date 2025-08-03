const { body, validationResult } = require('express-validator');

const bookValidationRules = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 2 }).withMessage('Title must be at least 2 characters'),
  body('author')
    .notEmpty().withMessage('Author is required'),
  body('publishedYear')
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() }).withMessage('Published year must be a valid year'),
];

const validateBook = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  bookValidationRules,
  validateBook,
};
