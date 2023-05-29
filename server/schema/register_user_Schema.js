const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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
  ConfirmPassword: {
    type: String,
    required: true,
  },
});

register_user.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bcrypt.hash(this.Password, 12);
    this.ConfirmPassword = await bcrypt.hash(this.ConfirmPassword, 12);
  }
  next();
});

// register_user.pre("save", function (doc) {
//   // console.log(process.env.EMAIL, process.env.PASSWORD);
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: this.Email,
//     subject: "Registration Confirmation",
//     text: `Dear ${this.Name},\n\nThank you for registering.`,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.error("Error sending email:", error);
//     } else {
//       console.log("Email sent:", info.response);
//     }
//   });
// });

module.exports = mongoose.model("register_user", register_user);
