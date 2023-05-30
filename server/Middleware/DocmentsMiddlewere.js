const multer = require("multer");
const fs = require("fs");

const path = require("path");
const { application } = require("express");

const Documents = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == "AddharCard") {
      if (
        file.mimetype == "application/doc" ||
        file.mimetype == "application/pdf"
      ) {
        const Addharlocation = `../Public/Documents/${req.user._id}/AddharCard/`;

        if (!fs.existsSync(Addharlocation)) {
          fs.mkdirSync(Addharlocation, { recursive: true });
        } else {
          fs.readdirSync(Addharlocation).forEach((file) => {
            fs.unlinkSync(path.join(Addharlocation, file));
          });
        }

        cb(null, Addharlocation);
      }
    } else if (file.fieldname == "Resume") {
      if (
        file.mimetype == "application/doc" ||
        file.mimetype == "application/pdf"
      ) {
        const Resumelocation = `../Public/Documents/${req.user._id}/Resume/`;

        if (!fs.existsSync(Resumelocation)) {
          fs.mkdirSync(Resumelocation, { recursive: true });
        } else {
          fs.readdirSync(Resumelocation).forEach((file) => {
            fs.unlinkSync(path.join(Resumelocation, file));
          });
        }

        cb(null, Resumelocation);
      }
    }
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + "-" + extension;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "AddharCard") {
    file.mimetype === "application/doc" || file.mimetype === "application/pdf"
      ? cb(null, true)
      : cb(null, false);
  } else if (file.fieldname === "Resume") {
    file.mimetype === "application/doc" || file.mimetype === "application/pdf"
      ? cb(null, true)
      : cb(null, false);
  }
};

const UserDocuments = multer({
  storage: Documents,
  fileFilter,
}).fields([
  { name: "AddharCard", maxCount: 1 },
  { name: "Resume", maxCount: 1 },
]);

module.exports = UserDocuments;
