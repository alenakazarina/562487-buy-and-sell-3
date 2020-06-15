'use strict';

const {getCategoriesNoEmpty, getCategoryById,
  getOffersByCategory, getNewOffers, getPopularOffers
} = require(`../helpers`);

module.exports = {
  renderIndex: (req, res) => {
    const {dbUser, dbOffers, dbCategories} = res.locals;

    res.render(`index`, {
      page: `index`,
      appUser: dbUser,
      newOffers: getNewOffers(dbOffers),
      popularOffers: getPopularOffers(dbOffers),
      categories: getCategoriesNoEmpty(dbCategories)
    });
  },

  renderSearch: (req, res) => {
    const userSearch = req.query.search;
    const {dbUser, dbOffers, dbSearch} = res.locals;

    res.render(`search-result`, {
      page: `search-result`,
      appUser: dbUser,
      offers: dbOffers,
      newOffers: getNewOffers(dbOffers),
      searchedOffers: dbSearch,
      searchedValue: userSearch
    });
  },

  renderCategory: (req, res) => {
    const {categoryId} = req.params;
    const {dbUser, dbOffers, dbCategories} = res.locals;
    const pageCategory = getCategoryById(dbCategories, categoryId);

    res.render(`category`, {
      page: `category`,
      appUser: dbUser,
      offers: getNewOffers(getOffersByCategory(dbOffers, pageCategory.id)),
      categories: getCategoriesNoEmpty(dbCategories),
      activeCategory: pageCategory
    });
  }
};
