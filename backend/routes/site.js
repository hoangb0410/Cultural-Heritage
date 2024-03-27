const siteController = require("../controllers/siteController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();
// Create historical site
router.post("/createSite", siteController.createSite);
// Get all sites
router.get("/",middlewareController.verifyToken, siteController.getAllSites);
// Update site
router.put("/update/:id",middlewareController.verifyTokenAndAdminAuth, siteController.updateSite);
// Delete site
router.delete("/:id",middlewareController.verifyTokenAndAdminAuth,siteController.deleteSite);

module.exports = router;
