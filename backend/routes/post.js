const postController = require("../controllers/postController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();
// Create historical post
router.post("/createPost",middlewareController.verifyToken, postController.createPost);
// Get all posts
router.get("/", middlewareController.verifyToken, postController.getAllPosts);
// Update post
router.put("/update/:id",middlewareController.verifyTokenAndAuthorOrAdminPost, postController.updatePost);
// Delete post
router.delete("/:id",middlewareController.verifyTokenAndUserOrAdminAuth,postController.deletePost);

module.exports = router;
