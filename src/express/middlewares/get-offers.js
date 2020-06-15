'use strict';

module.exports = async (req, res, next) => {
  const service = req.app.locals.service;

  try {
    const offers = await service.get(`/offers`);
    res.locals.dbOffers = offers.data;
    next();
  } catch (err) {
    next(err);
  }
};
