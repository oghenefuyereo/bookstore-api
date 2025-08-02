const { body, validationResult } = require('express-validator');

// Validation rules for user creation/update
const userValidationRules = [
  body('googleId')
    .notEmpty().withMessage('googleId is required')
    .isString().withMessage('googleId must be a string'),
  
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email'),
];

// Middleware to check validation results
const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return all errors as array
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  userValidationRules,
  validateUser
};
