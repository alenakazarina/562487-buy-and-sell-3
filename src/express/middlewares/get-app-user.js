'use strict';

module.exports = (service) => async (req, res, next) => {
  try {
    const user = await service.get(`/user`);
    res.locals.dbUser = user.data;
    next();
  } catch (err) {
    next(err);
  }
};
