'use strict';
const express = require(`express`);
const {api} = require(`../api/api`);
const {Commands, HttpCode, InputData} = require(`../const`);
const {getLogger} = require(`../logger/logger`);

const logger = getLogger();
const pino = require(`express-pino-logger`)({logger});

const startRequest = (req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);
  next();
};

module.exports = {
  name: Commands.SERVER,
  run: (count) => {
    const port = Number.parseInt(count, 10) || InputData.DEFAULT_PORT;
    const server = express();

    server.use(pino);
    server.use(startRequest);
    server.use(express.json());

    server.use(`/api`, api);

    server.use((req, res) => {
      res
        .status(HttpCode.NOT_FOUND)
        .send({message: `not found`});
      logger.error(`End request with error ${res.statusCode}`);
    });

    server
      .listen(port, () => {
        logger.info(`Server listening on port: ${port}`);
      })
      .on(`error`, (err) => {
        logger.error(`Server can't start. Error: ${err}`);
      });
  }
};
