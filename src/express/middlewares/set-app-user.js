'use strict';

const dataService = require(`../data-service`);

let appUser = null;

module.exports = async (req, res, next) => {
  try {
    if (!appUser) {
      const currentUser = await dataService.getCurrentUser(next);
      if (currentUser) {
        appUser = currentUser;
      }
    }

    res.locals.appUser = appUser;
    next();
  } catch (err) {
    next(err);
  }
};
