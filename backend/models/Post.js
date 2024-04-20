const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, max: 100, unique: true },
    content: { type: String, required: true, max: 1000 },
    image_link: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site'},
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
