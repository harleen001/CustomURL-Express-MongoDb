const { connectToDatabase } = require("./connect");
const express = require("express");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const app = express();
const port = 8001;

connectToDatabase("mongodb://127.0.0.1:27017/url").then(() => console.log("Database connected"));

app.use(express.json()); // Middleware to parse JSON request bodies

// Define the /test route
app.get("/test", async (req, res) => {
  try {
    const allUrls = await URL.find({});
    const urlsList = allUrls.map(url => `
      <li>
        ${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}
      </li>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>All URLs</title>
      </head>
      <body>
        <ol>
          ${urlsList}
        </ol>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).send("Internal server error");
  }
});

// Use the URL route for /url
app.use("/url", urlRoute);

// Define the /:shortID route
app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortID },
      {
        $push: { visitHistory: { timestamp: Date.now() } }
      },
      { new: true }
    );

    if (entry && entry.redirectURL) {
      res.redirect(entry.redirectURL);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error("Error finding or updating URL:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Server started at PORT: ${port}.`);
});
