const { connectToDatabase } = require("./connect");
const path = require("path");
const express = require("express");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/static_router");
const URL = require("./models/url");
const app = express();
const port = 8001;

connectToDatabase("mongodb://127.0.0.1:27017/url").then(() => console.log("Database connected"));



app.set("view engine","ejs");
app.set('views',path.resolve("./views"));
app.use(express.json()); // Middleware to parse JSON request bodies

app.use(express. urlencoded({ extended: false }));

// Define the /test route
app.get("/test", async (req, res) => {
 
    const allUrls = await URL.find({});
    return res.render('home',{
urls: allUrls,
    });

});

// Use the URL route for /url
app.use("/url", urlRoute);

app.use("/",staticRoute); //If anything will start from /. It will use static Routes

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
