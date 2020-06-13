'use strict';

const Offer = require(`../models/offer`);

class OfferService {
  constructor(offers, categories) {
    this._offers = offers;
    this._categories = categories.map((category) =>
      Object.assign(category, {count: this._getCount(offers, category)}));
  }

  _getCount(offers, category) {
    return offers.filter((offer) => offer.category
      .findIndex((offerCategory) => offerCategory.id === category.id) !== -1).length;
  }

  getCategories() {
    return this._categories;
  }

  create(offer) {
    const newOffer = new Offer(offer, this._categories);
    this._offers.push(newOffer);
    return newOffer;
  }

  drop(offerId) {
    const index = this._offers.findIndex((offer) => offer.id === offerId);
    const droppedOffer = this._offers.splice(index, 1)[0];
    return droppedOffer;
  }

  getAll() {
    return this._offers;
  }

  getOne(offerId) {
    return this._offers.find((offer) => offer.id === offerId);
  }

  update(offerId, updateOffer) {
    const index = this._offers.findIndex((offer) => offer.id === offerId);
    const updatedOffer = new Offer(Object.assign(this._offers[index], updateOffer), this._categories);
    this._offers[index] = updatedOffer;
    return updatedOffer;
  }

  addComment(offerId, comment) {
    const index = this._offers.findIndex((offer) => offer.id === offerId);
    this._offers[index].comments.push(comment);
  }

  deleteComment(offerId, commentId) {
    const offerIndex = this._offers.findIndex((offer) => offer.id === offerId);
    const commentIndex = this._offers[offerIndex].comments.findIndex((comment) => comment.id === commentId);
    this._offers[offerIndex].comments.splice(commentIndex, 1);
  }
}

module.exports = OfferService;
