'use strict';
const {Router} = require(`express`);
const {cardsOffers} = require(`../data`);

const myRouter = new Router();

myRouter.get(`/`, (req, res) => {
  const pageContent = {
    page: `my`,
    title: `Куплю Продам`,
    description: `Доска объявлений — современный веб-сайт, упрощающий продажу или покупку абсолютно любых вещей.`,
    offers: cardsOffers
  };

  res.render(`my-tickets`, pageContent);
});

myRouter.get(`/comments`, (req, res) => {
  res.send(`/my/comments`);
});

module.exports = {
  myRouter
};
