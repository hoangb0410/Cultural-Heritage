const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    event_name: { type: String, required: true, max: 100, unique: true },
    event_date: { type: Date, required: true },
    image_link: { type: String, required: true },
    content: { type: String, required: true, max:1000 },
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

module.exports = mongoose.model("Event", eventSchema);
