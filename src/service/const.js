'use strict';
const InputData = {
  DEFAULT_COUNT: 1,
  MAX_COUNT: 1000,
  DEFAULT_PORT: 3000
};

const OffersData = {
  MAX_TEXT_LENGHT: 5,
  PRICE_LIMIT: {
    MIN: 1000,
    MAX: 10000
  },
  TYPE: {
    OFFER: `offer`,
    SALE: `sale`
  }
};

const Commands = {
  VERSION: `--version`,
  GENERATE: `--generate`,
  HELP: `--help`,
  SERVER: `--server`
};

const HttpCode = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

const DataPath = {
  IN: `./data/`,
  OUT: `./mocks.json`,
};

const DataFiles = {
  CATEGORIES: `categories.txt`,
  SENTENCES: `sentences.txt`,
  TITLES: `titles.txt`,
  COMMENTS: `comments.txt`
};

module.exports = {
  InputData,
  OffersData,
  Commands,
  HttpCode,
  DataPath,
  DataFiles
};
