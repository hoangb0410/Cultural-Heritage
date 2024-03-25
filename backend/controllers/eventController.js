const Event = require("../models/Event");

const eventController = {
  // Create Event
  createEvent: async (req, res) => {
    try {
      // Create new Post
      const newEvent = new Event({
        event_name: req.body.event_name,
        event_date: req.body.event_date,
        image: req.body.image.map((img) => ({
          image_name: img.image_name,
          image_link: img.image_link,
          description: img.description,
        })),
        content: req.body.content,
        site: req.body.site
      });
      const event = await newEvent.save();
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Get all events
  getAllEvents: async (req, res) => {
    try {
      const event = await Event.find();
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete post
  deleteEvent: async (req, res) => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successful!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = eventController;
