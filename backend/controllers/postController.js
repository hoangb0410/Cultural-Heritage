const Post = require("../models/Post");

const postController = {
  // Create Post
  createPost: async (req, res) => {
    try {
      const {title, content, image, author} = req.body;
      // Create new Post
      const newPost = new Post({
        title,
        content,
        image: image.map((img) => ({
          image_name: img.image_name,
          image_link: img.image_link,
          description: img.description,
        })),
        author
      });
      const post = await newPost.save();
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Get all posts
  getAllPosts: async (req, res) => {
    try {
      const post = await Post.find();
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete post
  deletePost: async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successful!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = postController;