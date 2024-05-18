const shortid = require("shortid");
const URL = require("../models/url");

// Generate URL
exports.generateNewShortURL = async (req, res) => {
    const { url } = req.body;
  
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }
  
    const shortID = shortid.generate(); // Generate shortId using shortid library
  
    try {
      await URL.create({
        shortId: shortID, // Corrected field name
        redirectURL: url,
        visitHistory: []
      });
  
      res.status(201).json({ id: shortID }); // Changed to 201 for resource creation
    } catch (error) {
      console.error("Error generating short URL:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

// Get number of times URL clicked
exports.getAnalytics = async (req, res) => {
  const { shortID } = req.params;

  try {
    const result = await URL.findOne({ shortID });

    if (!result) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
