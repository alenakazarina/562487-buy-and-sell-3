'use strict';

const makeId = require(`../utils/make-id`);

const getCategoriesFromIds = (categories, ids) => {
  return categories.filter((category) => ids.includes(category.id));
};

class Offer {
  constructor(offer, categories) {
    this.id = makeId();
    this.createdAt = new Date();
    this.comments = [];
    this.category = getCategoriesFromIds(categories, offer.category);
    this.description = offer.description;
    this.title = offer.title;
    this.type = offer.type;
    this.sum = offer.sum;
    this.picture = offer.picture;
    this.pictureSrcset = offer.pictureSrcset;
    this.user = offer.user;
  }
}

module.exports = Offer;
