const eventController = require("../controllers/eventController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();
// Create event
router.post("/createEvent", eventController.createEvent);
// Get all events
router.get("/", middlewareController.verifyToken, eventController.getAllEvents);
// Delete event
router.delete("/:id",middlewareController.verifyTokenAndAdminAuth, eventController.deleteEvent);

module.exports = router;
