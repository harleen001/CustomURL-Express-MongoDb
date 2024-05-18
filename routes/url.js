const express = require("express");
const urlController = require("../controllers/url");
const router = express.Router();

// URL shortener router
router.post("/", urlController.generateNewShortURL); // Define the POST route

// Get the number of times link used
router.get("/analytics/:shortID", urlController.getAnalytics);

module.exports = router;
