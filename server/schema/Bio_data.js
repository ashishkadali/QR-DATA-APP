const mongoose = require("mongoose");

const Bio_Data = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  FatherName: {
    type: String,
    require: true,
  },

  Email: {
    type: String,
    require: true,
    unique: true,
  },

  Mobile: {
    type: Number,
    require: true,
    unique: true,
  },

  Age: {
    type: Number,
    required: true,
  },

  Gender: {
    type: String,
    require: True,
    enum: ["Male", "Female", "Others"],
  },

  Language: { type: [String], require: true },

  Addres: [
    {
      Address: {
        type: String,
        require: true,
      },

      City: {
        type: Number,
        require: true,
      },

      Pincode: {
        type: Number,
        require: true,
      },
    },
  ],

  Education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      Percentage: { type: Number, require: true },
      year: { type: Number, required: true },
    },
  ],

  workExperience: [
    {
      company: { type: String, required: true },
      position: { type: String, required: true },
      duration: { type: String, required: true },
    },
  ],

  AddharCard: {
    type: Buffer,
    require: true,
  },

  Resume: {
    type: Buffer,
    require: true,
  },
});

module.exports = Bio_Data;
