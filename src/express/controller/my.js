'use strict';

const {sortByDate, getOffersByUserId, getOffersWithComments,
  getOfferByCommentId, getAllComments} = require(`../helpers`);
const {COMMENTS_PAGE_COUNT} = require(`../const`);

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
    .slice(0, COMMENTS_PAGE_COUNT)
    .map((offer) => {
      offer.comments = sortByDate(offer.comments);
      return offer;
    });
};

module.exports = {
  renderMyOffers: (req, res) => {
    const {dbUser, dbOffers} = res.locals;
    if (!dbUser) {
      return res.redirect(`/login`);
    }

    return res.render(`my-tickets`, {
      page: `my-tickets`,
      appUser: dbUser,
      offers: sortByDate(getOffersByUserId(dbOffers, dbUser.id))
    });
  },

  renderMyComments: (req, res) => {
    const {dbUser, dbOffers} = res.locals;
    if (!dbUser) {
      return res.redirect(`/login`);
    }

    const pageContent = {
      page: `comments`,
      appUser: dbUser,
      offers: []
    };
    const userOffers = getOffersByUserId(dbOffers, dbUser.id);
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
