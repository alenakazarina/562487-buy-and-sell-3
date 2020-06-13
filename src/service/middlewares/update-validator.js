'use strict';

const UPLOAD_DIR = `upload/`;
const offerKeys = [`category`, `description`, `title`, `type`, `sum`];

module.exports = (req, res, next) => {
  if (!res.locals.offer) {
    return next();
  }

  const updateData = req.body;
  const keys = Object.keys(updateData);
  const keysExists = offerKeys.every((key) => keys.includes(key));
  const keysAreValid = keys.every((key) => offerKeys.includes(key));

  if (keys.length === 0 || !keysAreValid || !keysExists) {
    res.locals.offer = null;
    return next();
  }

  const offerAvatar = req.file ? `${UPLOAD_DIR}${req.file.filename}` : res.locals.offer.picture;

  res.locals.offer = {
    description: updateData.description,
    title: updateData.title,
    type: updateData.type,
    sum: updateData.sum,
    picture: offerAvatar,
    pictureSrcset: offerAvatar.replace(/\./, `@2x.`),
    category: updateData.category
  };

  return next();
};
