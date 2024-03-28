const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    event_name: { type: String, required: true, max: 100, unique: true },
    event_date: { type: Date, required: true },
    image: [
      {
        image_name: { type: String, required: true },
        image_link: { type: String, required: true },
        description: { type: String},
      },
    ],
    content: { type: String, required: true, max:1000 },
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site'}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
