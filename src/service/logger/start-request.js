'use strict';
const {getLogger} = require(`./logger`);
const logger = getLogger();

const startRequest = (req, res, next) => {
  logger.debug(`Start ${req.method} to URL: ${req.url}`);
  next();
};

module.exports = startRequest;
