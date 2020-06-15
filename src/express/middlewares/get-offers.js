'use strict';

module.exports = (service) => async (req, res, next) => {
  try {
    const offers = await service.get(`/offers`);
    res.locals.dbOffers = offers.data;
    next();
  } catch (err) {
    next(err);
  }
};
