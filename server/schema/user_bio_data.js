const mongoose = require("mongoose");

const user_bio_data = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  AdharCard: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("USER", user_bio_data);
