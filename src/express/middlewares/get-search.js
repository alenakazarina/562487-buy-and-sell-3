'use strict';

module.exports = (service) => async (req, res, next) => {
  try {
    const userSearch = req.query.search;
    const searchResults = await service.get(`/search?query=${encodeURI(userSearch)}`);
    res.locals.dbSearch = searchResults.data;
    next();
  } catch (err) {
    next(err);
  }
};
