'use strict';

const {sortByDate} = require(`../helpers`);
const dataService = require(`../data-service`);
const {DEFAULT_OFFER} = require(`../const`);

module.exports = {
  renderOffer: async (req, res, next) => {
    const pageOffer = await dataService.getOffer(req.params.offerId, next);

    return res.render(`ticket`, {
      page: `ticket`,
      appUser: res.locals.appUser,
      offer: pageOffer,
      comments: pageOffer.comments.length ? sortByDate(pageOffer.comments) : [],
      categories: pageOffer.category
    });
  },

  renderOfferAdd: async (req, res, next) => {
    const user = res.locals.appUser;
    if (!user) {
      return res.redirect(`/login`);
    }

    const dbCategories = await dataService.getCategories(next);

    return res.render(`new-ticket`, {
      page: `new-ticket`,
      appUser: user,
      categories: dbCategories,
      offer: DEFAULT_OFFER
    });
  },

  renderOfferEdit: async (req, res, next) => {
    const {offerId} = req.params;
    const user = res.locals.appUser;
    if (!user) {
      return res.redirect(`/login`);
    }

    const dbCategories = await dataService.getCategories(next);
    const dbOffer = await dataService.getOffer(offerId, next);

    return res.render(`ticket-edit`, {
      page: `ticket-edit`,
      appUser: user,
      categories: dbCategories,
      offer: dbOffer
    });
  }
};
