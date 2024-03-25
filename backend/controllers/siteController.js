const Site = require("../models/Site");

const siteController = {
  // Create Site
  createSite: async (req, res) => {
    try {
      // Create new Site
      const newSite = new Site({
        site_name: req.body.site_name,
        province_name: req.body.province_name,
        region: req.body.region,
        address: req.body.address,
        map_diagram: req.body.map_diagram,
        image: req.body.image.map((img) => ({
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
  // Delete user
};

module.exports = siteController;
