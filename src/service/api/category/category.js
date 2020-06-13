'use strict';
const {HttpCode} = require(`../../const`);
const endRequest = require(`../../logger/end-request`);

module.exports = (app, dataService) => {
  const offerService = dataService.offer;

  app.get(`/categories`, (req, res) => {
    const categories = offerService.getCategories();
    res.status(HttpCode.OK)
      .json(categories);
    endRequest(req.method, req.originalUrl, res.statusCode);
  });
};
