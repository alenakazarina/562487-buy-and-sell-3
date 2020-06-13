'use strict';

const multer = require(`multer`);
const fs = require(`fs`).promises;

const UPLOAD_DIR = `src/express/public/upload`;

const storageConfig = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.access(UPLOAD_DIR);
      cb(null, UPLOAD_DIR);
    } catch (err) {
      await fs.mkdir(UPLOAD_DIR);
      cb(null, UPLOAD_DIR);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storageConfig,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === `image/png` || file.mimetype === `image/jpeg`) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

module.exports = (fieldname) => upload.single(fieldname);
