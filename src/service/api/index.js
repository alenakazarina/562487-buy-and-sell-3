'use strict';

const {Router} = require(`express`);
const getOffersData = require(`../utils/get-offers-data`);
const getCategoriesData = require(`../utils/get-categories-data`);
const getUsersData = require(`../utils/get-users-data`);
const category = require(`./category/category`);
const offer = require(`./offer/offer`);
const search = require(`./search/search`);
const comment = require(`./comment/comment`);
const user = require(`./user/user`);
const DataService = require(`../data-service`);
const {getLogger} = require(`../logger/logger`);
const logger = getLogger();

const app = new Router();

(async () => {
  try {
    const offersMocks = await getOffersData();
    const categoriesMocks = await getCategoriesData();
    const usersMocks = getUsersData(offersMocks);
    const dataService = new DataService(offersMocks, categoriesMocks, usersMocks);
    category(app, dataService);
    offer(app, dataService, dataService);
    comment(app, dataService, dataService);
    search(app, dataService);
    user(app, dataService);
  } catch (err) {
    logger.error(err);
  }
})();

module.exports = app;
