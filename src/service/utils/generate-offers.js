'use strict';

const {OffersData} = require(`../const`);
const makeId = require(`../utils/make-id`);
const {getRandomInteger, getRandomItem, getRandomItems, getPictures, getRandomText, getRandomDate} = require(`./generate-random`);
const generateUsers = require(`./generate-users`);
const generateCategories = require(`./generate-categories`);
const generateComments = require(`./generate-comments`);
const User = require(`../models/user`);

module.exports = ({categories, sentences, titles, comments, count}) => {
  const categoriesData = generateCategories(categories);
  const pictures = getPictures();
  const users = generateUsers();

  return Array.from({length: count}, () => {
    const offerId = makeId();
    const offerPicture = getRandomItem(pictures);
    const author = User.toJSON(getRandomItem(users));
    return {
      id: offerId,
      type: getRandomItem(Object.values(OffersData.TYPE)),
      createdAt: getRandomDate(),
      title: getRandomItem(titles),
      description: getRandomText(sentences, OffersData.MAX_TEXT_LENGHT),
      sum: getRandomInteger(OffersData.PRICE_LIMIT.MIN, OffersData.PRICE_LIMIT.MAX),
      picture: offerPicture,
      pictureSrcset: offerPicture.slice().replace(`.`, `@2x.`),
      category: getRandomItems(categoriesData),
      comments: generateComments(offerId, users, comments),
      user: author
    };
  });
};
