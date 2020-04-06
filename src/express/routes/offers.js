'use strict';
const {Router} = require(`express`);
const {cardsOffers, offerComments, offersCategories, PageContent} = require(`./data`);

const offersRouter = new Router();

const OffersRoutes = {
  CATEGORY: `/category/:id`,
  ADD: `/add`,
  EDIT: `/edit/:id`,
  OFFER: `/:id`
};

offersRouter.get(OffersRoutes.CATEGORY, (req, res) => {
  const categoryPageContent = Object.assign({}, PageContent, {
    page: `category`,
    offers: cardsOffers.filter(
        (offer) => offer.category.includes(offersCategories[1].title)
    ),
    categories: offersCategories,
    activeCategory: offersCategories[1]
  });

  res.render(`category`, categoryPageContent);
});

offersRouter.get(OffersRoutes.ADD, (req, res) => {
  const newOfferPageContent = Object.assign({}, PageContent, {
    page: `new-ticket`
  });

  res.render(`new-ticket`, newOfferPageContent);
});

offersRouter.get(OffersRoutes.EDIT, (req, res) => {
  const editOfferPageContent = Object.assign({}, PageContent, {
    page: `ticket-edit`,
    offer: cardsOffers[2]
  });

  res.render(`ticket-edit`, editOfferPageContent);
});

offersRouter.get(OffersRoutes.OFFER, (req, res) => {
  const offerPageContent = Object.assign({}, PageContent, {
    page: `ticket`,
    offer: cardsOffers[2],
    offers: cardsOffers,
    categories: offersCategories.slice(0, 2),
    comments: offerComments
  });

  res.render(`ticket`, offerPageContent);
});

module.exports = {
  offersRouter
};
