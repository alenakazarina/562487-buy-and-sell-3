'use strict';

const {NEW_OFFERS_COUNT, POPULAR_OFFERS_COUNT} = require(`./const`);

const sortByDate = (items) => {
  return items.slice().sort((firstItem, secondItem) =>
    new Date(secondItem.createdAt) - new Date(firstItem.createdAt));
};

const sortPopular = (offers) => {
  return offers.slice().sort((firstOffer, secondOffer) =>
    secondOffer.comments.length - firstOffer.comments.length);
};

const getCategoriesNoEmpty = (categories) => {
  return categories.filter((category) => category.count !== 0);
};

const getCategoryById = (categories, categoryId) => {
  return categories.find((category) => category.id === categoryId);
};

const getOffersByCategory = (offers, categoryId) => {
  return offers.filter((offer) => offer.category.findIndex((category) => category.id === categoryId) !== -1);
};

const getOffersByUserId = (offers, userId) => {
  return offers.filter((offer) => offer.user.id === userId);
};

const getOffersWithComments = (offers) => {
  return offers.filter((offer) => offer.comments.length !== 0);
};

const getNewOffers = (offers) => sortByDate(offers).slice(0, NEW_OFFERS_COUNT);

const getPopularOffers = (offers) => sortPopular(offers).slice(0, POPULAR_OFFERS_COUNT);

const getOfferByCommentId = (offers, commentId) => {
  return offers.find((offer) => offer.comments.findIndex((comment) => comment.id === commentId) !== -1);
};

const getAllComments = (offers) => {
  return offers.reduce((acc, it) => acc.concat(...it.comments), []);
};

const getCategoriesFromIds = (categories, ids) => {
  return categories.filter((category) => ids.includes(category.id));
};

module.exports = {
  sortByDate,
  sortPopular,
  getCategoriesNoEmpty,
  getCategoryById,
  getOffersByCategory,
  getOffersByUserId,
  getOffersWithComments,
  getNewOffers,
  getPopularOffers,
  getOfferByCommentId,
  getAllComments,
  getCategoriesFromIds
};
