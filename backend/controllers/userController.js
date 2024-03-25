const User = require("../models/User");

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete user
  deleteUser: async (req, res) => {
    try {
      //const user = await User.findById(req.params.id);
      const user = await User.findByIdAndDelete(req.params.id); // Xoa that
      res.status(200).json("Delete successful!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
