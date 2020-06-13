'use strict';

module.exports = (offers) => {
  return offers.reduce((acc, it) => {
    const offerUser = Object.assign(it.user, {password: `123`});
    if (acc.length === 0) {
      return acc.concat(offerUser);
    }
    const isUnique = acc.findIndex((accUser) => accUser.id === offerUser.id) === -1;
    if (isUnique) {
      return acc.concat(offerUser);
    }
    return acc;
  }, []);
};
