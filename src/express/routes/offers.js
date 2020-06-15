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

route.get(`/category/:categoryId`, getAppUser, getOffers, getCategories, commonController.renderCategory);
route.get(`/add`, getAppUser, getCategories, offerController.renderOfferAdd);
route.post(`/add`, getAppUser, uploadPicture(`avatar`), setOfferData, offerAdd, offerController.postOfferAdd);
route.get(`/edit/:offerId`, getAppUser, getOffer, getCategories, offerController.renderOfferEdit);
route.post(`/edit/:offerId`, getAppUser, uploadPicture(`avatar`), setOfferData, offerEdit, offerController.postOfferEdit);
route.get(`/:offerId`, getAppUser, getOffer, offerController.renderOffer);

module.exports = route;
