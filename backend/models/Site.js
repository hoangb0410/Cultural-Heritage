const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
  {
    site_name: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    province_name: {
      type: String,
      required: true,
      max: 50,
    },
    region: {
      type: String,
      required: true,
      min: 6,
    },
    address: {
      type: String,
      required: true,
      max: 80,
    },
    map_diagram: {
      type: String,
      max: 80,
    },
    image: [
      {
        image_name: { type: String, required: true },
        image_link: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("HistoricalSite", siteSchema);
