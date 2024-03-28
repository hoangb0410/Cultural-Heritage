const postController = require("../controllers/postController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();
// Create historical post
router.post("/createPost", postController.createPost);
// Get all posts
router.get("/", middlewareController.verifyToken, postController.getAllPosts);
// Update post
router.put("/update/:id",middlewareController.verifyTokenAndAdminAuth, postController.updatePost);
// Delete post
router.delete("/:id",middlewareController.verifyTokenAndAdminAuth,postController.deletePost);

module.exports = router;
