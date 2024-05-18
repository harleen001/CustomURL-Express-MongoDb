const express = require("express");
const urlController = require("../controllers/url"); // Correct controller import
const router = express.Router();

// URL shortener router
router.post("/", urlController.generateNewShortURL);

// Get the number of times link used
router.get("/analytics/:shortID", urlController.getAnalytics);

module.exports = router;
