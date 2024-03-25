const siteController = require("../controllers/siteController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();
// Create historical site
router.post("/createSite", siteController.createSite);
// Get all sites
router.get("/",middlewareController.verifyToken, siteController.getAllSites);
// Delete site
router.delete("/:id",middlewareController.verifyTokenAndAdminAuth,siteController.deleteSite);

module.exports = router;
