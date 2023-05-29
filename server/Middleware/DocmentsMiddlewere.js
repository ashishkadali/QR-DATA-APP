const multer = require("multer");
const fs = require("fs");

const path = require("path");
const { application } = require("express");

const Documents = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.fieldname == "AddharCard" ||
      file.mimetype == "application/doc" ||
      file.mimetype == "application/pdf"
    ) {
      const location = `../Public/Documents/${req.user.email}/AddharCard`;

      if (!fs.existsSync(location)) {
        fs.mkdirSync(location, { recursive: true });
      }

      cb(null, location);
    } else if (
      file.fieldname == "Resume" ||
      file.mimetype == "application/doc" ||
      file.mimetype == "application/pdf"
    ) {
      const location = `../Public/Documents/${req.user.email}/Resume`;

      if (!fs.existsSync(location)) {
        fs.mkdirSync(location, { recursive: true });
      }

      cb(null, location);
    }
  },

  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname == "AddharCard") {
    file.mimetype == "application/doc" || file.mimetype == "application/pdf"
      ? cb(null, true)
      : cb(null, false);
  } else if (file.fieldname == "Resume") {
    file.mimetype == "application/doc" || file.mimetype == "application/pdf"
      ? cb(null, true)
      : cb(null, false);
  }
};

const UserDocuments = multer({
  Documents,
  fileFilter,
}).fields([
  { name: "AddharCard", maxCount: 1 },
  { name: "Resume", maxCount: 1 },
]);

module.exports = UserDocuments;
