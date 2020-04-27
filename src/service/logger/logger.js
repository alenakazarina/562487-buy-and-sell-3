'use strict';
const pinoDebug = require(`pino-debug`);

const logger = require(`pino`)({
  name: `pino-logger`,
  level: process.env.LOG_LEVEL || `info`,
  prettyPrint: {colorize: true}
});

pinoDebug(logger, {
  auto: true,
  map: {
    'app:server': `debug`,
    'app:router': `debug`,
    '*': `trace`
  }
});

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
