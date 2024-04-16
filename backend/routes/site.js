const siteController = require("../controllers/siteController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();
// Create historical site
router.post("/createSite", middlewareController.verifyToken, siteController.createSite);
// Get all sites
router.get("/", siteController.getAllSites);
// Get site by ID
router.get("/:id", siteController.getSite);
// Update site
router.put("/update/:id",middlewareController.verifyTokenAndAuthorOrAdminSite, siteController.updateSite);
// Delete site
router.delete("/:id",middlewareController.verifyTokenAndAuthorOrAdminSite,siteController.deleteSite);

module.exports = router;
