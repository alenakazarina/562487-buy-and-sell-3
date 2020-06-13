'use strict';

const {Router} = require(`express`);
const myController = require(`../controller/my`);

const route = new Router();

route.get(`/`, myController.renderMyOffers);
route.get(`/comments`, myController.renderMyComments);

module.exports = route;
