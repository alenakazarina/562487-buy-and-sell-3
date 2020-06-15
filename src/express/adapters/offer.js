'use strict';

class Offer {
  constructor(offerData, avatar) {
    this.description = offerData[`comment`].trim();
    this.title = offerData[`ticket-name`].trim();
    this.type = offerData[`action`];
    this.sum = offerData[`price`];
    this.category = offerData[`category`];
    this.picture = avatar;
    this.pictureSrcset = avatar.replace(/\./, `@2x.`);
  }
}

module.exports = Offer;
