'use strict';

const {Router} = require(`express`);
const commonController = require(`../controller/common`);
const authController = require(`../controller/auth`);
const getAppUser = require(`../middlewares/get-app-user`);
const getOffers = require(`../middlewares/get-offers`);
const getCategories = require(`../middlewares/get-categories`);
const getSearch = require(`../middlewares/get-search`);

const route = new Router();

route.get(`/`, getAppUser, getOffers, getCategories, commonController.renderIndex);
route.get(`/register`, getAppUser, authController.renderSignUp);
route.get(`/login`, getAppUser, authController.renderLogin);
route.get(`/search`, getAppUser, getOffers, getSearch, commonController.renderSearch);

module.exports = route;
