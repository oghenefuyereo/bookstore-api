const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { bookValidationRules, validateBook } = require('../middleware/bookValidation');

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookValidationRules, validateBook, bookController.createBook);
router.put('/:id', bookValidationRules, validateBook, bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
