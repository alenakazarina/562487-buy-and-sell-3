'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  find(query) {
    const searchingString = query.split(`-`).join(` `).toLowerCase();
    return (
      this._offers
        .filter((offer) => {
          const lowerCaseTitle = offer.title.toLowerCase();
          return lowerCaseTitle.includes(searchingString);
        })
    );
  }
}

module.exports = SearchService;
