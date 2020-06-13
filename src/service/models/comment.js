'use strict';

const makeId = require(`../utils/make-id`);

class Comment {
  constructor(id, comment, appUser) {
    this.id = makeId();
    this.text = comment.text;
    this.createdAt = new Date();
    this.user = appUser;
    this.offerId = id;
  }
}

module.exports = Comment;
