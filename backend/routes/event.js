const eventController = require("../controllers/eventController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();
// Create event
router.post("/createEvent", middlewareController.verifyTokenAndAdminAuth, eventController.createEvent);
// Get all events
router.get("/", eventController.getAllEvents);
// Update event
router.put("/update/:id",middlewareController.verifyTokenAndAdminAuth, eventController.updateEvent);
// Delete event
router.delete("/:id",middlewareController.verifyTokenAndAdminAuth, eventController.deleteEvent);

module.exports = router;
