'use strict';
const express = require(`express`);
const clientApp = require(`../../express`);
const {Commands} = require(`../const`);
const routes = require(`../api`);
const {PORT, PORT_CLIENT} = require(`../config`);
const setHeaders = require(`../middlewares/set-headers`);
const startRequest = require(`../logger/start-request`);
const {getLogger} = require(`../logger/logger`);
const logger = getLogger();

module.exports = {
  name: Commands.SERVER,
  run: (userPort) => {
    const port = userPort || PORT;
    const app = express();
    app.use(setHeaders);
    app.use(express.json());
    app.use(startRequest);
    app.use(`/api`, routes);

    app
      .listen(port, () => {
        logger.info(`Server listening on port: ${port}`);
      })
      .on(`error`, (err) => {
        logger.error(`Server can't start. Error: ${err}`);
      });

    clientApp
      .listen(PORT_CLIENT, () => {
        logger.info(`Client app listening on port: ${PORT_CLIENT}`);
      })
      .on(`error`, (err) => {
        logger.error(`Client app can't start. Error: ${err}`);
      });
  }
};
