const siteController = require("../controllers/siteController");

const router = require("express").Router();
// Create historical site
router.post("/createSite", siteController.createSite);
// Get all users
router.get("/", siteController.getAllSites);

module.exports = router;
