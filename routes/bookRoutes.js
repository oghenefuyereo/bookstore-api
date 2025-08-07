const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const {
  bookValidationRules,
  validateBook,
} = require("../middleware/bookValidation");
const ensureAuth = require("../middleware/authMiddleware");

router.get("/", ensureAuth, bookController.getBooks);
router.get("/:id", ensureAuth, bookController.getBookById);
router.post(
  "/",
  ensureAuth,
  bookValidationRules,
  validateBook,
  bookController.createBook
);
router.put(
  "/:id",
  ensureAuth,
  bookValidationRules,
  validateBook,
  bookController.updateBook
);
router.delete("/:id", ensureAuth, bookController.deleteBook);

module.exports = router;
