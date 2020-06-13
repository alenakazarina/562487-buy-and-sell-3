'use strict';

const endRequest = require(`../../logger/end-request`);

module.exports = (app, dataService) => {
  const searchService = dataService.search;

  app.get(`/search`, (req, res) => {
    const query = req.query.query;
    if (!query) {
      res.json([]);
    } else {
      const offers = searchService.find(query);
      res.json(offers);
    }
    endRequest(req.method, req.originalUrl, res.statusCode);
  });
};
