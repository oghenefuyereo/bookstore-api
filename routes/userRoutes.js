const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../middleware/validateUser');

// Get all users
router.get('/', userController.getUsers);

// Get user by ID  
router.get('/:id', userController.getUserById);

// Create a new user (with validation)
router.post('/', validateUser, userController.createUser);

// Update user by ID (you should add validation here too if desired)
router.put('/:id', validateUser, userController.updateUser);

// Delete user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
