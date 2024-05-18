const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {  // Corrected field name
      type: String,
      required: true,
      unique: true,
    },

    redirectURL: {
      type: String,
      required: true,
    },

    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const URL = mongoose.model("URL", urlSchema); // Capitalize model name

module.exports = URL;
