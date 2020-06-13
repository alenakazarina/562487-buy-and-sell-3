'use strict';

const OfferService = require(`./offer`);
const SearchService = require(`./search`);
const CommentService = require(`./comment`);
const UserService = require(`./user`);

class DataService {
  constructor(offersMocks, categoriesMocks, usersMocks) {
    this.offer = new OfferService(offersMocks, categoriesMocks);
    this.comment = new CommentService(offersMocks);
    this.search = new SearchService(offersMocks);
    this.user = new UserService(usersMocks);
  }
}

module.exports = DataService;
