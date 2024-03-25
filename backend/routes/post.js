const postController = require("../controllers/postController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();
// Create historical post
router.post("/createPost", postController.createPost);
// Get all posts
router.get("/", middlewareController.verifyToken, postController.getAllPosts);
// Delete post
router.delete("/:id",middlewareController.verifyTokenAndAdminAuth,postController.deletePost);

module.exports = router;
