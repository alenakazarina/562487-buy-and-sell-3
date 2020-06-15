'use strict';

module.exports = (service) => async (req, res, next) => {
  try {
    const {offerId} = req.params;
    const offer = await service.get(`offers/${offerId}`);
    res.locals.dbOffer = offer.data;
    next();
  } catch (err) {
    next(err);
  }
};
