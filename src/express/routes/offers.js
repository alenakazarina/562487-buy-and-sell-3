'use strict';

const {Router} = require(`express`);
const commonController = require(`../controller/common`);
const offerController = require(`../controller/offer`);
const getAppUser = require(`../middlewares/get-app-user`);
const getOffers = require(`../middlewares/get-offers`);
const getOffer = require(`../middlewares/get-offer`);
const getCategories = require(`../middlewares/get-categories`);
const uploadPicture = require(`../../service/middlewares/upload-picture`);
const setOfferData = require(`../middlewares/set-offer-data`);
const offerAdd = require(`../middlewares/offer-add`);
const offerEdit = require(`../middlewares/offer-edit`);

const route = new Router();

module.exports = (service) => {
  route.get(`/category/:categoryId`, getAppUser(service), getOffers(service), getCategories(service), commonController.renderCategory);

  route.get(`/add`, getAppUser(service), getCategories(service), offerController.renderOfferAdd);

  route.post(`/add`, getAppUser(service), uploadPicture(`avatar`), setOfferData, offerAdd(service), offerController.postOfferAdd);

  route.get(`/edit/:offerId`, getAppUser(service), getOffer(service), getCategories(service), offerController.renderOfferEdit);

  route.post(`/edit/:offerId`, getAppUser(service), uploadPicture(`avatar`), setOfferData, offerEdit(service), offerController.postOfferEdit);

  route.get(`/:offerId`, getAppUser(service), getOffer(service), offerController.renderOffer);

  return route;
};
