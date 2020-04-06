'use strict';
const {Router} = require(`express`);
const {cardsOffers, offersCategories, PageContent} = require(`./data`);

const Routes = {
  ROOT: `/`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  SEARCH: `/search`
};

const commonRouter = new Router();

commonRouter.get(Routes.ROOT, (req, res) => {
  const rootPageContent = Object.assign({}, PageContent, {
    page: `index`,
    isAuth: false,
    offers: cardsOffers,
    categories: offersCategories
  });
  res.render(`index`, rootPageContent);
});

commonRouter.get(Routes.REGISTER, (req, res) => {
  const signUpPageContent = Object.assign({}, PageContent, {
    page: `sign-up`,
    isAuth: false
  });
  res.render(`sign-up`, signUpPageContent);
});

commonRouter.get(Routes.LOGIN, (req, res) => {
  const loginPageContent = Object.assign({}, PageContent, {
    page: `login`,
    isAuth: false
  });
  res.render(`login`, loginPageContent);
});

commonRouter.get(Routes.SEARCH, (req, res) => {
  const searchPageContent = Object.assign({}, PageContent, {
    page: `search-result`,
    isAuth: false,
    offers: cardsOffers,
    searchedOffers: cardsOffers.slice(0, 2),
    searchedValue: `Электроника`
  });
  res.render(`search-result`, searchPageContent);
});

module.exports = {
  commonRouter
};
