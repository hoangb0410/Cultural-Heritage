const postController = require("../controllers/postController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();
// Create historical post
router.post("/createPost",middlewareController.verifyToken, postController.createPost);
// Get all posts
router.get("/", postController.getAllPosts);
// Get post by ID
router.get("/:id", postController.getPost);
// Update post
router.put("/update/:id",middlewareController.verifyTokenAndAuthorOrAdminPost, postController.updatePost);
// Delete post
router.delete("/:id",middlewareController.verifyTokenAndAuthorOrAdminPost,postController.deletePost);

module.exports = router;
