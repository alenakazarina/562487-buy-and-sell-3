'use strict';

module.exports = {
  renderSignUp: (req, res) => {
    if (res.locals.appUser) {
      return res.redirect(`/`);
    }
    return res.render(`sign-up`, {
      page: `sign-up`
    });
  },

  renderLogin: async (req, res) => {
    if (res.locals.appUser) {
      return res.redirect(`/`);
    }
    return res.render(`login`, {
      page: `login`
    });
  }
};
