const Site = require("../models/Site");
const User = require("../models/User");
const siteController = {
  // Create Site
  createSite: async (req, res) => {
    try {
      const {site_name, province_name, region, address, content, map_diagram, image_link} = req.body;
      // Create new Site
      const newSite = new Site({
        site_name,
        province_name,
        region,
        address,
        content,
        map_diagram,
        image_link,
        author: req.user.id
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
  // Get site by ID
  getSite: async (req, res) => {
    try {
      const site = await Site.findById(req.params.id);
      res.status(200).json(site);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update site
  updateSite: async (req, res) => {
    try {
      // Validate site ID
      const {id} = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Invalid site ID' });
      }
      const {site_name, province_name, region, address, content, map_diagram, image, status} = req.body;
      const updateData = {};
      updateData.site_name = site_name;
      updateData.province_name = province_name;
      updateData.region = region;
      updateData.address = address;
      updateData.content = content;
      updateData.map_diagram = map_diagram;
      updateData.image = image;
      if (status) {
        if (req.user.isAdmin){
          updateData.status = status;
        } else {
          return res.status(403).json("Only admin can edit status");
        }
      }

      // Update user in the database
      const updatedSite = await Site.findByIdAndUpdate(id, { $set: updateData }, { new: true });
      // Check if the user was found and updated
      if (!updatedSite) {
        return res.status(404).json({ message: "Site not found" });
      }
      res.status(200).json(updatedSite);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
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
  // Add interest site ID to list
  addSiteToUserInterest: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      // Add site ID to user's interest list
      user.interest_site.push(req.params.id);
      const updatedUser = await user.save();
      res.status(200).json("Add successful!");
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }
};

module.exports = siteController;
