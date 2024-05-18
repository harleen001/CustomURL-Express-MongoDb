const shortid = require("shortid");
const URL = require("./../models/url");

// Generate URL
exports.generateNewShortURL = async (req, res) => {
  const body = req.body;
  const shortID = shortid.generate(); // Correct function to generate short ID

  if (!body.url)
    return res.status(400).json({
      error: "URL is required",
    });

  try {
    await URL.create({
      shortID: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    res.status(200).json({
      id: shortID,
    });
  } catch (error) {
    console.error("Error generating short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get number of times URL clicked
exports.getAnalytics = async (req, res) => {
  const shortID = req.params.shortID;

  try {
    const result = await URL.findOne({ shortID });

    if (!result)
      return res.status(404).json({
        error: "URL not found",
      });

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
