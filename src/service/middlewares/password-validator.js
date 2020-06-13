'use strict';

module.exports = (req, res, next) => {
  const userLogin = req.body;
  const user = res.locals.user;
  if (user && userLogin.password !== user.password) {
    res.locals.user = null;
  }
  next();
};
