'use strict';
const InputData = {
  defaultCount: 1,
  maxCount: 1000,
  defaultPort: 3000
};

const OffersData = {
  maxTextLength: 5,
  priceLimit: {
    min: 1000,
    max: 10000
  },
  type: {
    offer: `offer`,
    sale: `sale`
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
  TITLES: `titles.txt`
};

module.exports = {
  InputData,
  OffersData,
  Commands,
  HttpCode,
  DataPath,
  DataFiles
};
