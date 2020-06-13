'use strict';

const Comment = require(`../models/comment`);

class CommentService {
  constructor(offers) {
    this._comments = offers.reduce((acc, it) => acc.concat(...it.comments), []);
  }

  create(offerId, comment, appUser) {
    const newComment = new Comment(offerId, comment, appUser);
    this._comments.push(newComment);
    return newComment;
  }

  drop(comment) {
    const index = this._comments.findIndex((dbComment) => dbComment.id === comment.id);
    const droppedComment = this._comments.splice(index, 1)[0];
    return droppedComment;
  }

  getByOfferId(offerId) {
    return this._comments.filter((comment) => comment.offerId === offerId);
  }

  getOne(commentId) {
    return this._comments.find((comment) => comment.id === commentId);
  }

  deleteOfferComments(offerId) {
    this._comments.forEach((comment, index) => {
      if (comment.offerId === offerId) {
        this._comments.splice(index, 1);
      }
    });
    return [];
  }
}

module.exports = CommentService;
