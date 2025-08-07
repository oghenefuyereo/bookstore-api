const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  userValidationRules,
  validateUser,
} = require("../middleware/validateUser");
const ensureAuth = require("../middleware/authMiddleware");

// Protect all user routes with ensureAuth
router.get("/", ensureAuth, userController.getUsers);
router.get("/:id", ensureAuth, userController.getUserById);
router.post(
  "/",
  ensureAuth,
  userValidationRules,
  validateUser,
  userController.createUser
);
router.put(
  "/:id",
  ensureAuth,
  userValidationRules,
  validateUser,
  userController.updateUser
);
router.delete("/:id", ensureAuth, userController.deleteUser);

module.exports = router;
