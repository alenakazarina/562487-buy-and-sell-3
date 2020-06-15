'use strict';

module.exports = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const dbOffer = service.getOne(offerId);

  if (!dbOffer) {
    res.locals.dbOffer = null;
  } else {
    res.locals.dbOffer = dbOffer;
  }
  next();
};
