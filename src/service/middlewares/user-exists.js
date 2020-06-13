'use strict';

module.exports = (service) => (req, res, next) => {
  const user = service.findByEmail(req.body.email);
  res.locals.user = user;
  next();
};
