'use strict';

module.exports = (service) => (req, res, next) => {
  const {commentId} = req.params;
  const comment = service.getOne(commentId);

  if (!comment) {
    res.locals.comment = null;
  } else {
    res.locals.comment = comment;
  }
  next();
};
