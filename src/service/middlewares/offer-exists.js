'use strict';

module.exports = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const offer = service.getOne(offerId);

  if (!offer) {
    res.locals.offer = null;
  } else {
    res.locals.offer = offer;
  }
  next();
};
