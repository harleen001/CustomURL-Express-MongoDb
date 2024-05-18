const { connectToDatabase } = require("./connect");
const express = require("express");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const app = express();
const port = 8001;

connectToDatabase(
  "mongodb://127.0.0.1:27017/url"
).then(() => console.log("Database connected"));

app.use(express.json());

app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;

  const entry = await URL.findOneAndUpdate(
    { shortID },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true } // Return the updated document
  );

  if (entry && entry.redirectURL) {
    res.redirect(entry.redirectURL);
  } else {
    // Handle the case where entry is null or entry.redirectURL is not available
    // You could send an error response or redirect to a default URL
    res.status(404).send("URL not found");
  }
});


app.use("/url", urlRoute);

app.listen(port, () => {
  console.log(`Server started at PORT: ${port}.`);
});