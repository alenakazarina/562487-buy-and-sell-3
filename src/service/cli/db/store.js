'use strict';
const {HttpCode} = require(`../../const`);
const {readOffers, readCategories} = require(`./helpers`);
const {Offer, Comment} = require(`./models`);

const store = {};

module.exports = {
  init: async () => {
    store.offers = await readOffers();
    store.categories = await readCategories();
  },

  getOffers: () => store.offers,

  getCategories: () => store.categories,

  getOfferById: (offerId) => store.offers.find((offer) => offer.id === offerId),

  deleteOffer: (offerId) => {
    const offer = store.offers.find((storeOffer) => storeOffer.id === offerId);
    if (offer) {
      store.offers = store.offers.filter((storeOffer) => storeOffer.id !== offerId);
      return HttpCode.NO_CONTENT;
    } else {
      return HttpCode.NOT_FOUND;
    }
  },

  deleteComment: (offerId, commentId) => {
    const offer = store.offers.find((storeOffer) => storeOffer.id === offerId);
    const comment = offer.comments.find((offerComment) => offerComment.id === commentId);
    if (comment) {
      offer.comments = offer.comments.filter((offerComment) => offerComment.id !== commentId);
      return HttpCode.NO_CONTENT;
    } else {
      return HttpCode.NOT_FOUND;
    }
  },

  addOffer: (newOffer) => {
    const storeOffer = new Offer(newOffer);
    store.offers.push(storeOffer);
    return storeOffer.id;
  },

  addComment: (offerId, newComment) => {
    const comment = new Comment(newComment);
    store.offers.forEach((offer) => {
      if (offer.id === offerId) {
        offer.comments.push(comment);
      }
    });
    return comment.id;
  },

  updateOffer: (offerId, updatedFields) => {
    const fieldToProp = {
      'ticket-name': `title`,
      'action': `type`,
      'comment': `description`,
      'avatar': `picture`,
      'price': `sum`,
      'category': `category`
    };
    store.offers.forEach((storeOffer) => {
      if (storeOffer.id === offerId) {
        Object.keys(updatedFields).forEach((field) => {
          const offerProp = fieldToProp[field];
          storeOffer[offerProp] = updatedFields[field];
        });
      }
    });
    return offerId;
  },

  search: (query) => {
    const searchingString = query.split(`-`).join(` `).toLowerCase();
    return (
      store.offers
        .filter((storeOffer) => {
          const lowerCaseTitle = storeOffer.title.toLowerCase();
          return lowerCaseTitle.includes(searchingString);
        })
        .map((offer) => offer.id)
    );
  }
};
