const eventController = require("../controllers/eventController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();
// Create event
router.post("/createEvent", eventController.createEvent);
// Get all events
router.get("/", middlewareController.verifyToken, eventController.getAllEvents);
// Update event
router.put("/update/:id",middlewareController.verifyTokenAndUserOrAdminAuth, eventController.updateEvent);
// Delete event
router.delete("/:id",middlewareController.verifyTokenAndUserOrAdminAuth, eventController.deleteEvent);

module.exports = router;
