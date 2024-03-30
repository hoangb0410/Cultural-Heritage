const Inquiry = require("../models/Inquiry");

const inquiryController = {
  // Create Inquiry
  createInquiry: async (req, res) => {
    try {
      const {name, email, subject, content, status, date_created} = req.body;
      // Create new Inquiry
      const newInquiry = new Inquiry({
        name,
        email,
        subject,
        content,
        status
      });
      const inquiry = await newInquiry.save();
      res.status(200).json(inquiry);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Get all inquiries
  getAllInquiries: async (req, res) => {
    try {
      const inquiry = await Inquiry.find();
      res.status(200).json(inquiry);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete inquiry
  deleteInquiry: async (req, res) => {
    try {
      const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successful!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = inquiryController;
