'use strict';

const {unlink} = require(`fs`).promises;
const {getCategoriesFromIds} = require(`../helpers`);

module.exports = (service) => async (req, res, next) => {
  const {offerData} = res.locals;
  try {
    const newOffer = await service.post(`/offers`, offerData);
    res.locals.newOffer = newOffer.data;
    return next();
  } catch (err) {
    if (err.response.status >= 400 && err.response.status < 500) {
      if (req.file) {
        await unlink(req.file.path);
      }
      const dbUser = await service.get(`/user`);
      const dbCategories = await service.get(`/categories`);
      offerData.category = getCategoriesFromIds(dbCategories.data, offerData.category);

      res.locals.userOffer = offerData;
      res.locals.dbUser = dbUser.data;
      res.locals.dbCategories = dbCategories.data;
      return next();
    }
    return next(err);
  }
};
