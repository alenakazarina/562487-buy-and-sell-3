'use strict';

const UPLOAD_DIR = `upload/`;
const offerKeys = [`category`, `description`, `title`, `type`, `sum`];

module.exports = (req, res, next) => {
  const offerData = req.body;
  const keys = Object.keys(offerData);
  const keysExists = offerKeys.every((key) => keys.includes(key));
  const keysAreValid = keys.every((key) => offerKeys.includes(key));

  if (keys.length === 0 || !keysAreValid || !keysExists) {
    res.locals.offer = null;
    return next();
  }

  const offerAvatar = req.file ? `${UPLOAD_DIR}${req.file.filename}` : ``;
  res.locals.offer = {
    description: offerData.description,
    title: offerData.title,
    type: offerData.type,
    sum: offerData.sum,
    picture: offerAvatar,
    pictureSrcset: offerAvatar.replace(/\./, `@2x.`),
    category: offerData.category
  };
  return next();
};
