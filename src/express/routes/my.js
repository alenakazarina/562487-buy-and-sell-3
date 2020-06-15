'use strict';

const {Router} = require(`express`);
const myController = require(`../controller/my`);
const getAppUser = require(`../middlewares/get-app-user`);
const getOffers = require(`../middlewares/get-offers`);

const route = new Router();

route.get(`/`, getAppUser, getOffers, myController.renderMyOffers);
route.get(`/comments`, getAppUser, getOffers, myController.renderMyComments);

module.exports = route;
