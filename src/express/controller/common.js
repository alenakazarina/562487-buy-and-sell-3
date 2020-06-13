'use strict';

const dataService = require(`../data-service`);
const {getCategoriesNoEmpty, getCategoryById,
  getOffersByCategory, getNewOffers, getPopularOffers
} = require(`../helpers`);

module.exports = {
  renderIndex: async (req, res, next) => {
    const dbOffers = await dataService.getOffers(next);
    const dbCategories = await dataService.getCategories(next);

    res.render(`index`, {
      page: `index`,
      appUser: res.locals.appUser,
      newOffers: getNewOffers(dbOffers),
      popularOffers: getPopularOffers(dbOffers),
      categories: getCategoriesNoEmpty(dbCategories)
    });
  },

  renderSearch: async (req, res, next) => {
    const userSearch = req.query.search;
    const dbOffers = await dataService.getOffers(next);
    const dbSearch = await dataService.getSearch(userSearch, next);

    res.render(`search-result`, {
      page: `search-result`,
      appUser: res.locals.appUser,
      offers: dbOffers,
      newOffers: getNewOffers(dbOffers),
      searchedOffers: dbSearch,
      searchedValue: userSearch
    });
  },

  renderCategory: async (req, res, next) => {
    const {categoryId} = req.params;
    const dbOffers = await dataService.getOffers(next);
    const dbCategories = await dataService.getCategories(next);
    const pageCategory = getCategoryById(dbCategories, categoryId);
    const pageCategoryOffers = getOffersByCategory(dbOffers, pageCategory.id);

    res.render(`category`, {
      page: `category`,
      appUser: res.locals.appUser,
      offers: getNewOffers(pageCategoryOffers),
      categories: getCategoriesNoEmpty(dbCategories),
      activeCategory: pageCategory
    });
  }
};
