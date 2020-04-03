'use strict';
const DEFAULT_COUNT = 1;
const MAX_INPUT_COUNT = 1000;
const DEFAULT_PORT = 3000;

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
  DEFAULT_COUNT,
  MAX_INPUT_COUNT,
  DEFAULT_PORT,
  Commands,
  HttpCode,
  DataPath,
  DataFiles
};
