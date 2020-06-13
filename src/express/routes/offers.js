'use strict';

const {Router} = require(`express`);
const commonController = require(`../controller/common`);
const offerController = require(`../controller/offer`);

const route = new Router();
route.get(`/category/:categoryId`, commonController.renderCategory);
route.get(`/add`, offerController.renderOfferAdd);
route.get(`/edit/:offerId`, offerController.renderOfferEdit);
route.get(`/:offerId`, offerController.renderOffer);

module.exports = route;
