const siteController = require("../controllers/siteController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();
// Create historical site
router.post("/createSite", middlewareController.verifyToken, siteController.createSite);
// Get all sites
router.get("/", siteController.getAllSites);
// Get site by ID
router.get("/:id", siteController.getSite);
// Get XML site by ID 
router.get("/XML/:id", siteController.getXMLSite);
// Update site
router.put("/update/:id",middlewareController.verifyTokenAndAuthorOrAdminSite, siteController.updateSite);
// Add more content
router.put("/addContent/:id",middlewareController.verifyTokenAndAuthorOrAdminSite, siteController.addContent);
// Delete site
router.delete("/:id",middlewareController.verifyTokenAndAuthorOrAdminSite,siteController.deleteSite);
// Add Site to favourite
router.post("/addToInterest/:id",middlewareController.verifyToken, siteController.addSiteToUserInterest);

module.exports = router;
