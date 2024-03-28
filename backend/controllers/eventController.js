const Event = require("../models/Event");

const eventController = {
  // Create Event
  createEvent: async (req, res) => {
    try {
      const {event_name, event_date, image, content, site} = req.body;
      // Create new Post
      const newEvent = new Event({
        event_name,
        event_date,
        image: image.map((img) => ({
          image_name: img.image_name,
          image_link: img.image_link,
          description: img.description,
        })),
        content,
        site
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
  // Update event
  updateEvent: async (req, res) => {
    try {
      // Validate event ID
      const {id} = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Invalid event ID' });
      }
      const updateData = req.body;
      // Update event in the database
      const updatedEvent = await Event.findByIdAndUpdate(id, { $set: updateData }, { new: true });
      // Check if the event was found and updated
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json(updatedEvent);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
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