const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

//database schema
const user_bio_data = require("./schema/user_bio_data.js");
const register_user = require("./schema/register_user_Schema");
const Bio_Data = require("./schema/Bio_data");

//multer is to upload data in database
const multer = require("multer");
const storage = require("./Middleware/MulterMiddleware");
const UserDocuments = require("./Middleware/DocmentsMiddlewere");
//middlewere
const jwtMiddleware = require("./Middleware/JWTMiddelwere");

dotenv.config();
const PORT = process.env.PORT || 5000;
const uploads = multer({ storage });

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/QR-DATA-APP", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Error in connecting to the database:", error);
  });

app.get("/", (req, res) => {
  res.send("Hi, this is Ashish");
});

app.post("/register", async (req, res) => {
  try {
    const { Name, Email, Password, ConfirmPassword } = req.body;

    const user_exists = await register_user.findOne({ Email });

    if (user_exists && user_exists.Email == Email) {
      return res.status(400).send("Email is already registed");
    }

    if (Password !== ConfirmPassword) {
      return res.status(400).send("passwords did'nt match");
    }

    const user = new register_user({
      Name,
      Email,
      Password,
      ConfirmPassword,
    });

    await user.save();
    console.log("registration completed");

    res.status(200).send("registration completed");
  } catch (error) {
    if (error) throw error;
    res.status(400).send("error is on the register method");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const user_exits = await register_user.findOne({ Email });
    console.log(user_exits);

    if (!user_exits) {
      return res.status(400).send("User is not registered");
    }

    const PasswordMatch = bcrypt.compareSync(Password, user_exits.Password);

    if (!PasswordMatch) {
      return res.status(400).send("Password is incorrect");
    }

    const token = jwt.sign(
      { _id: user_exits._id.toString() },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(400).send("An error occurred during login");
  }
});

app.get("/home", jwtMiddleware, async (req, res) => {
  try {
    const user_exists = await register_user.findById(req.user._id);
    if (!user_exists) {
      res.status(404).send("User not found");
    }
    res.status(200).send(user_exists);
  } catch (error) {
    if (error) throw error;
    res.status(400).send("Error on the home page");
  }
});

app.post("/upload", jwtMiddleware, UserDocuments, async (req, res, err) => {
  try {
    const {
      Name,
      FatherName,
      Email,
      Mobile,
      Gender,
      DOB,
      Language,
      Addres,
      Education,
      workExperience,
    } = req.body;

    const user_exists = await register_user.findOne({ Email });

    if (!user_exists) {
      return res.send("email is already added used");
    }

    const Addharlocation = `./Public/Documents/${req.user._id}/AddharCard/`;
    const Resumelocation = `./Public/Documents/${req.user._id}/Resume/`;

    // const Addharpath = path.join(Addharlocation, req.file.filename);
    // const Resumepath = path.join(Resumelocation, req.file.filename);

    // console.log(fs.readFileSync(Addharlocation));
    // console.log("hi");

    const Bio = new Bio_Data({
      Name,
      FatherName,
      Email,
      Mobile,
      Gender,
      DOB,
      Language,
      Addres,
      Education,
      workExperience,
      AddharCard: {
        data: fs.readFileSync(Addharlocation + req.file.filename),
        contentType: "application/pdf/doc",
      },
      Resume: {
        data: fs.readFileSync(Resumelocation + req.file.filename),
        contentType: "application/pdf/doc",
      },
    });

    await Bio.save();
    console.log("Data saved in the database");

    res.send("Data is saved in data base");
  } catch (error) {
    if (error) throw error;
    res.status(400).send("Error on the upload page");
  }
});

// HTML5, CSS3, JavaScript, Typescript, React, and Redux

app.post("/", uploads.single("AdharCard"), async (req, res) => {
  try {
    const { Name, FirstName, Email } = req.body;

    const user_exists = userdata.findOne({ Email });
    if (user_exists) {
      return res.send("email is already added used");
    }
    const location = `./uploads/${req.body.Email}/`;

    const user = new user_bio_data({
      Name,
      FirstName,
      Email,
      AdharCard: {
        data: fs.readFileSync(location + req.file.filename),
        contentType: "image/png/jpeg",
      },
    });

    await user.save();
    console.log("Data saved in the database");

    res.status(200).send("Data posted in the database");
  } catch (error) {
    console.log("Error in the POST method:", error);
    res.status(500).send("Error occurred while processing the request");
  }
});

app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});

// process.on("uncaughtException", (err) => {
//   console.log("This error occurred:", err);
//   process.exit(1);
// });
