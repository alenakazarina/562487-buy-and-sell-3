'use strict';
const {getLogger} = require(`./logger`);
const logger = getLogger();

const endRequest = (method, url, status) => {
  logger.info(`End ${method} to URL: ${url} STATUS: ${status}`);
};

module.exports = endRequest;
