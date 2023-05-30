const mongoose = require("mongoose");

const Bio_Data = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  FatherName: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
    unique: true,
  },

  Mobile: {
    type: Number,
    required: true,
    unique: true,
  },

  Gender: {
    type: String,
    required: true,
  },

  DOB: {
    type: [String],
    required: true,
  },

  Language: {
    type: [String],
    required: true,
  },

  Addres: [
    {
      Address: {
        type: String,
        required: true,
      },

      City: {
        type: String,
        required: true,
      },

      Pincode: {
        type: Number,
        required: true,
      },
    },
  ],

  Education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      Percentage: { type: Number, required: true },
      year: { type: [Number], required: true },
    },
  ],

  workExperience: [
    {
      company: { type: String, required: true },
      position: { type: String, required: true },
      duration: { type: [Number], required: true },
    },
  ],

  AddharCard: {
    type: Buffer,
    required: true,
  },

  Resume: {
    type: Buffer,
    required: true,
  },
});

module.exports = Bio_Data;
