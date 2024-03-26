const Site = require("../models/Site");

const siteController = {
  // Create Site
  createSite: async (req, res) => {
    try {
      const {site_name, province_name, region, address, map_diagram, image} = req.body;
      // Create new Site
      const newSite = new Site({
        site_name,
        province_name,
        region,
        address,
        map_diagram,
        image: image.map((img) => ({
          image_name: img.image_name,
          image_link: img.image_link,
          description: img.description,
        })),
      });
      const site = await newSite.save();
      res.status(200).json(site);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Get all sites
  getAllSites: async (req, res) => {
    try {
      const site = await Site.find();
      res.status(200).json(site);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete site
  deleteSite: async (req, res) => {
    try {
      const site = await Site.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successful!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = siteController;
