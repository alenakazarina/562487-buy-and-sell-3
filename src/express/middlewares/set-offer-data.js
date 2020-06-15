'use strict';

const Offer = require(`../adapters/offer`);
const UPLOAD_DIR = `upload/`;

module.exports = (req, res, next) => {
  const avatar = req.file ? `${UPLOAD_DIR}${req.file.filename}` : ``;
  res.locals.offerData = new Offer(req.body, avatar);
  next();
};
