'use strict';

module.exports = {
  renderSignUp: (req, res) => {
    if (res.locals.dbUser) {
      return res.redirect(`/`);
    }
    return res.render(`sign-up`, {
      page: `sign-up`
    });
  },

  renderLogin: (req, res) => {
    if (res.locals.dbUser) {
      return res.redirect(`/`);
    }
    return res.render(`login`, {
      page: `login`
    });
  }
};
