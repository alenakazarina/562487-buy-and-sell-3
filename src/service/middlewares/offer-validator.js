'use strict';

const offerKeys = [`category`, `description`, `title`, `type`, `sum`, `picture`, `pictureSrcset`];

module.exports = (req, res, next) => {
  const offerData = req.body;
  const keys = Object.keys(offerData);
  const keysExists = offerKeys.every((key) => keys.includes(key));
  const keysAreValid = keys.every((key) => offerKeys.includes(key));

  if (keys.length === 0 || !keysAreValid || !keysExists) {
    res.locals.offerData = null;
    return next();
  }

  res.locals.offerData = offerData;
  return next();
};
