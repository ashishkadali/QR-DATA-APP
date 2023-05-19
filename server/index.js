const express = require("express");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const user_bio_data = require("./schema/user_bio_data.js");
const multer = require("multer");
const storage = require("./Middleware/MulterMiddleware");
const register_user = require("./schema/register_user_Schema");

const PORT = process.env.PORT || 8000;
const SALT_ROUNDS = 10;
const uploads = multer({ storage });
app.use(express.json());

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
    const { Name, Email, Password, ConforimPassword } = req.body;

    const user_exists = await register_user.findOne({ Email });

    if (user_exists) {
      return res.status(200).send("Email is already registed");
    }

    if (Password !== ConforimPassword) {
      return res.status(200).send("passwords did'nt match");
    }

    console.log(typeof SALT_ROUNDS);

    const hashing = await bcrypt
      .hash(Password, SALT_ROUNDS)
      .then((hash) => {
        console.log("Hash ", hash);
      })
      .catch((err) => console.error(err.message));

    await bcrypt.compare(ConforimPassword, Password, function (err, isMatch) {
      if (err) {
        throw err;
      } else if (!isMatch) {
        console.log("Password doesn't match!");
      } else {
        console.log("Password matches!");
      }
    });
    // const user = new user_bio_data({});
  } catch (error) {
    if (error) throw error;
    res.status(500).send("error is on the register method");
  }
});

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

process.on("uncaughtException", (err) => {
  console.log("This error occurred:", err);
  process.exit(1);
});
