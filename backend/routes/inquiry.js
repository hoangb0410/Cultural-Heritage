const inquiryController = require("../controllers/inquiryController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();
// Create inquiry
router.post("/createInquiry", inquiryController.createInquiry);
// Get all inquiries
router.get("/", middlewareController.verifyToken, inquiryController.getAllInquiries);
// Update inquiry
router.put("/update/:id",middlewareController.verifyTokenAndUserOrAdminAuth, inquiryController.updateInquiry);
// Delete inquiry
router.delete("/:id",middlewareController.verifyTokenAndUserOrAdminAuth, inquiryController.deleteInquiry);

module.exports = router;
