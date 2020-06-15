'use strict';

module.exports = (userService) => (req, res, next) => {
  res.locals.currentUser = userService.getCurrentUser();
  next();
};
