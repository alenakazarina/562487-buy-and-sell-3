'use strict';

const {Router} = require(`express`);
const commonController = require(`../controller/common`);
const authController = require(`../controller/auth`);
const getAppUser = require(`../middlewares/get-app-user`);
const getOffers = require(`../middlewares/get-offers`);
const getCategories = require(`../middlewares/get-categories`);
const getSearch = require(`../middlewares/get-search`);

const route = new Router();

module.exports = (service) => {
  route.get(`/`, getAppUser(service), getOffers(service), getCategories(service), commonController.renderIndex);

  route.get(`/register`, getAppUser(service), authController.renderSignUp);

  route.get(`/login`, getAppUser(service), authController.renderLogin);

  route.get(`/search`, getAppUser(service), getOffers(service), getSearch(service), commonController.renderSearch);

  return route;
};
