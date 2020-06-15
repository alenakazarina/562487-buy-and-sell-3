'use strict';

module.exports = async (req, res, next) => {
  const service = req.app.locals.service;

  try {
    const userSearch = req.query.search;
    const searchResults = await service.get(`/search?query=${encodeURI(userSearch)}`);
    res.locals.dbSearch = searchResults.data;
    next();
  } catch (err) {
    next(err);
  }
};
