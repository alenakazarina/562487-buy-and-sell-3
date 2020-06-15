'use strict';

const {unlink} = require(`fs`).promises;
const {getCategoriesFromIds} = require(`../helpers`);

module.exports = async (req, res, next) => {
  const service = req.app.locals.service;
  const {offerId} = req.params;
  const {offerData} = res.locals;

  try {
    const updatedOffer = await service.put(`/offers/${offerId}`, offerData);
    res.locals.updatedOffer = updatedOffer.data;
    return next();
  } catch (err) {
    if (err.response.status >= 400 && err.response.status < 500) {
      if (req.file) {
        await unlink(req.file.path);
      }
      const dbUser = await service.get(`/user`);
      const dbCategories = await service.get(`/categories`);
      const dbOffer = await service.get(`/offers/${offerId}`);
      offerData.category = getCategoriesFromIds(dbCategories.data, offerData.category);

      res.locals.userOffer = Object.assign(offerData, {
        id: dbOffer.data.id,
        picture: dbOffer.data.picture,
        pictureSrcset: dbOffer.data.pictureSrcset
      });
      res.locals.dbUser = dbUser.data;
      res.locals.dbCategories = dbCategories.data;
      return next();
    }
    return next(err);
  }
};
