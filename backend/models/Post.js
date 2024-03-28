const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, max: 100, unique: true },
    content: { type: String, required: true, max: 1000 },
    image: [
      {
        image_name: { type: String, required: true },
        image_link: { type: String, required: true },
        description: { type: String },
      },
    ],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site'},
    status: { 
      type: String, 
      enum: ['wait', 'approved', 'rejected'], 
      default: 'wait' 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
