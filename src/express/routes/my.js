'use strict';
const {Router} = require(`express`);
const {cardsOffers, offerComments, PageContent} = require(`./data`);

const myRouter = new Router();

myRouter.get(`/`, (req, res) => {
  const myPageContent = Object.assign({}, PageContent, {
    page: `my`,
    offers: cardsOffers
  });
  res.render(`my-tickets`, myPageContent);
});

myRouter.get(`/comments`, (req, res) => {
  const commentsPagecontent = Object.assign({}, PageContent, {
    page: `comments`,
    offers: cardsOffers.slice(0, 2),
    comments: offerComments
  });
  res.render(`comments`, commentsPagecontent);
});

module.exports = {
  myRouter
};
