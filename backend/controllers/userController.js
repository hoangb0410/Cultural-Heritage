const User = require("../models/User");
const bcrypt = require("bcrypt");

const userController = {
  //Register
  registerUser: async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        const {username, email} = req.body;
        //Create new user
        const newUser = await new User({
        username,
        email,
        password: hashed,
        });

        //Save user to DB
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
    },
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
