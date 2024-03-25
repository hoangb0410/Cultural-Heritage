const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

const router = require("express").Router();
// Register
router.post("/register", userController.registerUser);

// Get all users
router.get("/",middlewareController.verifyToken,userController.getAllUsers);

// Delete user
router.delete("/:id",middlewareController.verifyTokenAndAdminAuth,userController.deleteUser);

module.exports = router;