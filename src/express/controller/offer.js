'use strict';

const {sortByDate} = require(`../helpers`);
const processPicture = require(`../../service/utils/process-picture`);
const {DEFAULT_OFFER} = require(`../const`);

module.exports = {
  renderOffer: (req, res) => {
    const {dbUser, dbOffer} = res.locals;

    return res.render(`ticket`, {
      page: `ticket`,
      appUser: dbUser,
      offer: dbOffer,
      comments: dbOffer.comments.length ? sortByDate(dbOffer.comments) : [],
      categories: dbOffer.category
    });
  },

  renderOfferAdd: (req, res) => {
    const {dbUser, dbCategories} = res.locals;
    if (!dbUser) {
      return res.redirect(`/login`);
    }

    return res.render(`new-ticket`, {
      page: `new-ticket`,
      appUser: dbUser,
      categories: dbCategories,
      offer: DEFAULT_OFFER
    });
  },

  postOfferAdd: async (req, res) => {
    const {newOffer} = res.locals;
    if (!newOffer) {
      const {userOffer, dbUser, dbCategories} = res.locals;
      return res.render(`new-ticket`, {
        page: `new-ticket`,
        appUser: dbUser,
        categories: dbCategories,
        offer: userOffer,
        isError: true
      });
    }

    if (req.file) {
      await processPicture({
        picture: req.file.filename,
        width: 482,
        height: 598
      });
    }

    return res.redirect(`/my`);
  },

  renderOfferEdit: (req, res) => {
    const {dbUser, dbOffer, dbCategories} = res.locals;
    if (!dbUser) {
      return res.redirect(`/login`);
    }

    return res.render(`ticket-edit`, {
      page: `ticket-edit`,
      appUser: dbUser,
      categories: dbCategories,
      offer: dbOffer
    });
  },

  postOfferEdit: async (req, res) => {
    const {updatedOffer} = res.locals;

    if (!updatedOffer) {
      const {userOffer, dbUser, dbCategories} = res.locals;
      return res.render(`ticket-edit`, {
        page: `ticket-edit`,
        appUser: dbUser,
        categories: dbCategories,
        offer: userOffer,
        isError: true
      });
    }

    if (req.file) {
      await processPicture({
        picture: req.file.filename,
        width: 482,
        height: 598
      });
    }

    return res.redirect(`/my`);
  },
};
