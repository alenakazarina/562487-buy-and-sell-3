'use strict';

module.exports = (service) => async (req, res, next) => {
  try {
    const dbCategories = await service.get(`/categories`);
    res.locals.dbCategories = dbCategories.data;
    next();
  } catch (err) {
    next(err);
  }
};
