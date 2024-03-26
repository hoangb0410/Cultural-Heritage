const inquiryController = require("../controllers/inquiryController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();
// Create event
router.post("/createInquiry", inquiryController.createInquiry);
// Get all events
router.get("/", middlewareController.verifyToken, inquiryController.getAllInquiries);
// Delete event
router.delete("/:id",middlewareController.verifyTokenAndAdminAuth, inquiryController.deleteInquiry);

module.exports = router;
