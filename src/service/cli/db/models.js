'use strict';
const {nanoid} = require(`nanoid`);

class User {
  constructor(user) {
    this.id = nanoid(6);
    this.name = user[`user-name`];
    this.email = user[`user-email`];
    this.password = user[`user-password`];
    this.avatar = user[`avatar`];
  }
}

class Offer {
  constructor(offer) {
    this.id = nanoid(6);
    this.title = offer[`ticket-name`];
    this.type = offer[`action`];
    this.description = offer[`comment`];
    this.sum = offer[`price`];
    this.picture = offer[`avatar`];
    this.category = offer[`category`];
    this.comments = [];
  }
}

class Comment {
  constructor(comment) {
    this.id = nanoid(6);
    this.text = comment.comment;
  }
}

module.exports = {
  User,
  Offer,
  Comment
};
