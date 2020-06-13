'use strict';

const commentKeys = [`text`];

module.exports = (req, res, next) => {
  const newComment = req.body;
  const keys = Object.keys(newComment);
  const keysExists = commentKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.locals.comment = null;
  } else {
    res.locals.comment = req.body;
  }
  next();
};
