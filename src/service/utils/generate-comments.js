'use strict';

const {getRandomInteger, getRandomItem, getRandomText, getRandomDate} = require(`./generate-random`);
const User = require(`../models/user`);
const Comment = require(`../models/comment`);

module.exports = (offerId, users, comments) => {
  const commentsCount = getRandomInteger(0, 5);
  return Array.from({length: commentsCount}, () => {
    const author = User.toJSON(getRandomItem(users));
    const content = {
      text: getRandomText(comments, getRandomInteger(1, (comments.length - 1) / 2))
    };
    const comment = new Comment(offerId, content, author);
    comment.createdAt = getRandomDate();
    return comment;
  });
};
