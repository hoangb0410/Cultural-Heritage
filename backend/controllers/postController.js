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
  // Update post
  updatePost: async (req, res) => {
    try {
      // Validate post ID
      const {id} = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Invalid post ID' });
      }
      const updateData = req.body;
      // Update post in the database
      const updatedPost = await Post.findByIdAndUpdate(id, { $set: updateData }, { new: true });
      // Check if the post was found and updated
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
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
