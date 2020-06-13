'use strict';

const dataService = require(`../data-service`);
const {sortByDate, getOffersByUserId, getOffersWithComments,
  getOfferByCommentId, getAllComments} = require(`../helpers`);
const {COMMENTS_PAGE_OFFERS_COUNT} = require(`../const`);

const getUniqueOffersFromComments = (comments, offers) => {
  return comments.reduce((acc, it) => {
    const commentOffer = getOfferByCommentId(offers, it.id);
    if (acc.length === 0) {
      return acc.concat(commentOffer);
    }
    const isExists = acc.findIndex((offer) => offer.id === commentOffer.id) !== -1;
    return isExists ? acc : acc.concat(commentOffer);
  }, []);
};

const getCommentsPageOffers = (offers) => {
  return offers
    .slice(0, COMMENTS_PAGE_OFFERS_COUNT)
    .map((offer) => {
      offer.comments = sortByDate(offer.comments);
      return offer;
    });
};

module.exports = {
  renderMyOffers: async (req, res, next) => {
    const user = res.locals.appUser;
    if (!user) {
      return res.redirect(`/login`);
    }
    const dbOffers = await dataService.getOffers(next);
    const userOffers = getOffersByUserId(dbOffers, user.id);

    return res.render(`my-tickets`, {
      page: `my-tickets`,
      appUser: user,
      offers: sortByDate(userOffers)
    });
  },

  renderMyComments: async (req, res, next) => {
    const user = res.locals.appUser;
    if (!user) {
      return res.redirect(`/login`);
    }
    const pageContent = {
      page: `comments`,
      appUser: user,
      offers: []
    };

    const dbOffers = await dataService.getOffers(next);
    const userOffers = getOffersByUserId(dbOffers, user.id);
    const userOffersWithComments = getOffersWithComments(userOffers);

    if (userOffersWithComments.length === 0) {
      return res.render(`comments`, pageContent);
    }

    const sortedComments = sortByDate(getAllComments(userOffersWithComments));
    const sortedOffers = getUniqueOffersFromComments(sortedComments, userOffers);

    return res.render(`comments`, Object.assign(pageContent, {
      offers: getCommentsPageOffers(sortedOffers)
    }));
  }
};
