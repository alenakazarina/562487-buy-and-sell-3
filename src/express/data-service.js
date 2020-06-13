'use strict';

const axios = require(`axios`);
const {BASE_URL} = require(`./const`);

const service = axios.create({
  baseURL: `/api`,
  timeout: 1000 * 5,
  withCredentials: true
});

const EndPoints = {
  CATEGORY: `${BASE_URL}/categories`,
  OFFERS: `${BASE_URL}/offers`,
  SEARCH: `${BASE_URL}/search?query=`,
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,
  USER: `${BASE_URL}/user`
};

let categories = [];

module.exports = {
  getOffers: async (next) => {
    try {
      const offers = await service.get(EndPoints.OFFERS);
      return offers.data;
    } catch (err) {
      return next(err);
    }
  },

  getCategories: async (next) => {
    try {
      if (categories.length) {
        return categories;
      }
      const dbCategories = await service.get(EndPoints.CATEGORY);
      categories = dbCategories.data;
      return categories;
    } catch (err) {
      return next(err);
    }
  },

  getSearch: async (userSearch, next) => {
    try {
      const searchResults = await service.get(`${EndPoints.SEARCH}${encodeURI(userSearch)}`);
      return searchResults.data;
    } catch (err) {
      return next(err);
    }
  },

  getOffer: async (offerId, next) => {
    try {
      const offer = await service.get(`${EndPoints.OFFERS}/${offerId}`);
      return offer.data;
    } catch (err) {
      if (err.response.status === 404) {
        return null;
      }
      return next(err);
    }
  },

  getCurrentUser: async (next) => {
    try {
      const user = await service.get(EndPoints.USER);
      return user.data;
    } catch (err) {
      return next(err);
    }
  }
};
