'use strict';

const {Router} = require(`express`);
const myController = require(`../controller/my`);
const getAppUser = require(`../middlewares/get-app-user`);
const getOffers = require(`../middlewares/get-offers`);

const route = new Router();

module.exports = (service) => {
  route.get(`/`, getAppUser(service), getOffers(service), myController.renderMyOffers);

  route.get(`/comments`, getAppUser(service), getOffers(service), myController.renderMyComments);

  return route;
};
