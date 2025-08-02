const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { userValidationRules, validateUser } = require('../middleware/validateUser');

// Get all users
router.get('/', userController.getUsers);

// Get user by ID  
router.get('/:id', userController.getUserById);

// Create a new user (with validation)
router.post('/', userValidationRules, validateUser, userController.createUser);

// Update user by ID (with validation)
router.put('/:id', userValidationRules, validateUser, userController.updateUser);

// Delete user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
