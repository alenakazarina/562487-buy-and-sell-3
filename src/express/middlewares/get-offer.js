'use strict';

module.exports = async (req, res, next) => {
  const service = req.app.locals.service;

  try {
    const {offerId} = req.params;
    const offer = await service.get(`offers/${offerId}`);
    res.locals.dbOffer = offer.data;
    next();
  } catch (err) {
    next(err);
  }
};
