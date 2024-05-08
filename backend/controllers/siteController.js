const Site = require("../models/Site");
const User = require("../models/User");
const xml2js = require("xml2js");
const siteController = {
  // Create Site
  createSite: async (req, res) => {
    try {
      const {
        site_name,
        province_name,
        region,
        address,
        content,
        map_diagram,
        image_link,
      } = req.body;
      // Create new Site
      const newSite = new Site({
        site_name,
        province_name,
        region,
        address,
        content,
        map_diagram,
        image_link,
        author: req.user.id,
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
      const site = await Site.find().sort({ createdAt: -1 });
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
  // Get XML site by ID
  getXMLSite: async (req, res) => {
    try {
      const site = await Site.findById(req.params.id);
      const xmlObject = {
        note: {
          name: site.site_name,
          location: site.address,
          content: {
            attr: site.content.map((content) => ({
              _: content.description,
              $: {
                name: content.name,
              },
            })),
          },
          source: site.map_diagram,
          img: site.image_link,
        },
      };
      const builder = new xml2js.Builder();
      const xml = builder.buildObject(xmlObject);
      res.set("Content-Type", "text/xml");
      res.send(xml);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Update site
  updateSite: async (req, res) => {
    try {
      // Validate site ID
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Invalid site ID" });
      }
      const {
        site_name,
        province_name,
        region,
        address,
        content,
        map_diagram,
        image,
        status,
      } = req.body;
      const updateData = {};
      updateData.site_name = site_name;
      updateData.province_name = province_name;
      updateData.region = region;
      updateData.address = address;
      updateData.content = content;
      updateData.map_diagram = map_diagram;
      updateData.image = image;
      if (status) {
        if (req.user.isAdmin) {
          updateData.status = status;
        } else {
          return res.status(403).json("Only admin can edit status");
        }
      }

      // Update user in the database
      const updatedSite = await Site.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
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
  // Add more content to site
  addContent: async (req, res) => {
    try {
      const { name, description } = req.body;
      const addContent = {};
      addContent.name = name;
      addContent.description = description;
      const site = await Site.findById(req.params.id);
      if (!addContent || !addContent.name || !addContent.description) {
        return res
          .status(400)
          .json("Missing required content properties (name, description)");
      }
      // Check if the site exists before accessing properties
      if (!site) {
        return res.status(404).json("Site not found!");
      }
      // Add site ID to user's interest list
      site.content.push(addContent);
      const updatedSite = await site.save();
      res.status(200).json("Add content successfully");
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
      res.status(200).json("Add site to favourite successful!");
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
};

module.exports = siteController;
