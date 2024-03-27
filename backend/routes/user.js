const userController = require("../controllers/userController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();
// Register
router.post("/register", userController.registerUser);

// Get all users
router.get("/",middlewareController.verifyToken,userController.getAllUsers);

// Update user
router.put("/update/:id",middlewareController.verifyTokenAndAdminAuth, userController.updateUser);

// Delete user
router.delete("/:id",middlewareController.verifyTokenAndAdminAuth,userController.deleteUser);

module.exports = router;