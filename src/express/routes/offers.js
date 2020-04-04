'use strict';
const {Router} = require(`express`);

const offersRouter = new Router();

const OffersRoutes = {
  CATEGORY: `/category/:id`,
  ADD: `/category/add`,
  EDIT: `/edit/:id`,
  OFFER: `/:id`
};

offersRouter.get(OffersRoutes.CATEGORY, (req, res) => {
  res.send(`/offers/category/${req.params.id}`);
});

offersRouter.get(OffersRoutes.ADD, (req, res) => {
  res.send(`/offers${OffersRoutes.ADD}`);
});

offersRouter.get(OffersRoutes.EDIT, (req, res) => {
  res.send(`/offers/edit/${req.params.id}`);
});

offersRouter.get(OffersRoutes.OFFER, (req, res) => {
  res.send(`/offers/${req.params.id}`);
});

module.exports = {
  offersRouter
};
