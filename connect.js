const mongoose = require("mongoose");

// Connect to the database
async function connectToDatabase(url) {
  try {
    await mongoose.connect(url);
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

module.exports = { connectToDatabase };
