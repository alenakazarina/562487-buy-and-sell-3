'use strict';

const UPLOAD_DIR = `upload/`;
const userKeys = [`user-name`, `user-email`, `user-password`, `user-password-again`];

module.exports = (req, res, next) => {
  if (res.locals.user) {
    res.locals.user = null;
    return next();
  }

  const keys = Object.keys(req.body);
  const keysExists = userKeys.every((key) => keys.includes(key));
  const keysAreValid = keys.every((key) => userKeys.includes(key));
  const notEqualPasswords = req.body[`user-password`] !== req.body[`user-password-again`];

  if (keys.length === 0 || !keysExists || !keysAreValid || notEqualPasswords) {
    res.locals.user = null;
    return next();
  }

  const userAvatar = req.file ? `${UPLOAD_DIR}${req.file.filename}` : ``;
  res.locals.user = {
    name: req.body[`user-name`],
    email: req.body[`user-email`],
    password: req.body[`user-password`],
    avatar: userAvatar,
    avatarSrcset: userAvatar.replace(/\./, `@2x.`)
  };
  return next();
};
