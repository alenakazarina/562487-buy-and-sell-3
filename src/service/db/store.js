'use strict';
const {Offer, Comment} = require(`./models`);

class Store {
  constructor(offers, categories) {
    this._offers = offers;
    this._categories = categories;
  }

  get offers() {
    return this._offers;
  }

  get categories() {
    return this._categories;
  }

  async getOffers() {
    return this.offers;
  }

  async getCategories() {
    return this.categories;
  }

  async createOffer(newOffer) {
    const storeOffer = new Offer(newOffer);
    this.offers.push(storeOffer);
    return storeOffer;
  }

  async getOfferById(offerId) {
    return this.offers.find((offer) => offer.id === offerId);
  }

  async updateOffer(offerId, updatedFields) {
    const offer = this.offers.find((storeOffer) => storeOffer.id === offerId);
    if (!offer) {
      return null;
    }
    if (updatedFields[`ticket-name`]) {
      offer[`title`] = updatedFields[`ticket-name`];
    }
    if (updatedFields[`action`]) {
      offer[`type`] = updatedFields[`action`];
    }
    if (updatedFields[`comment`]) {
      offer[`description`] = updatedFields[`comment`];
    }
    if (updatedFields[`avatar`]) {
      offer[`picture`] = updatedFields[`avatar`];
    }
    if (updatedFields[`price`]) {
      offer[`sum`] = updatedFields[`price`];
    }
    if (updatedFields[`category`]) {
      offer[`category`] = updatedFields[`category`];
    }
    return offer;
  }

  async deleteOffer(offerId) {
    const index = this.offers.findIndex((storeOffer) => storeOffer.id === offerId);
    if (index === -1) {
      return null;
    }
    const offer = this.offers.splice(index, 1)[0];
    return offer;
  }

  async addComment(offerId, newComment) {
    const comment = new Comment(newComment);
    const offer = this.offers.find((storeOffer) => storeOffer.id === offerId);

    if (!offer) {
      return null;
    }

    offer.comments.push(comment);
    return comment;
  }

  async deleteComment(offerId, commentId) {
    const offer = this.offers.find((storeOffer) => storeOffer.id === offerId);

    if (!offer) {
      return null;
    }

    const index = offer.comments.findIndex((offerComment) => offerComment.id === commentId);

    if (index === -1) {
      return null;
    }

    const comment = offer.comments.splice(index, 1)[0];
    return comment;
  }

  async search(query) {
    const searchingString = query.split(`-`).join(` `).toLowerCase();
    return (
      this.offers
        .filter((storeOffer) => {
          const lowerCaseTitle = storeOffer.title.toLowerCase();
          return lowerCaseTitle.includes(searchingString);
        })
    );
  }
}

module.exports = {
  Store
};
