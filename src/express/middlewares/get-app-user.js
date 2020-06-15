'use strict';

module.exports = async (req, res, next) => {
  const service = req.app.locals.service;

  try {
    const user = await service.get(`/user`);
    res.locals.dbUser = user.data;
    next();
  } catch (err) {
    next(err);
  }
};
