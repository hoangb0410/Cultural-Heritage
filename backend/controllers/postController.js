const Post = require("../models/Post");

const postController = {
  // Create Post
  createPost: async (req, res) => {
    try {
      const {title, content, image, site} = req.body;
      // Create new Post
      const newPost = new Post({
        title,
        content,
        image: image.map((img) => ({
          image_name: img.image_name,
          image_link: img.image_link,
          description: img.description,
        })),
        author: req.user.id,
        site
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
  // Get post by ID
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
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

      const {title, content, image, author, site, status} = req.body;

      const updateData = {};
      updateData.title = title;
      updateData.content = content;
      updateData.image = image;
      updateData.author = author;
      updateData.site = site;
      if (status) {
        if (req.user.isAdmin){
          updateData.status = status;
        } else {
          return res.status(403).json("Only admin can edit status");
        }
      }
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
