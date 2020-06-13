'use strict';

const {Router} = require(`express`);
const commonController = require(`../controller/common`);
const authController = require(`../controller/auth`);

const route = new Router();

route.get(`/`, commonController.renderIndex);
route.get(`/register`, authController.renderSignUp);
route.get(`/login`, authController.renderLogin);
route.get(`/search`, commonController.renderSearch);

module.exports = route;
