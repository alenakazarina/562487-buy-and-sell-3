'use strict';

module.exports = async (req, res, next) => {
  const service = req.app.locals.service;

  try {
    const dbCategories = await service.get(`/categories`);
    res.locals.dbCategories = dbCategories.data;
    next();
  } catch (err) {
    next(err);
  }
};
