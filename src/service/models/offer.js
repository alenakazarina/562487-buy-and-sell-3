'use strict';

const makeId = require(`../utils/make-id`);

class Offer {
  constructor(offer) {
    this.id = offer.id || makeId();
    this.createdAt = offer.createdAt || new Date();
    this.comments = offer.comments || [];
    this.category = offer.category;
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
