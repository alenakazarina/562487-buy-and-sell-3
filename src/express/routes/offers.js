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
  const pageContent = {
    page: `category`,
    title: `Куплю Продам`,
    description: `Доска объявлений — современный веб-сайт, упрощающий продажу или покупку абсолютно любых вещей.`
  };

  res.render(`category`, pageContent);
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
