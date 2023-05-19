const mongoose = require("mongoose");

const register_user = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  ConforimPassword: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("register_user", register_user);
