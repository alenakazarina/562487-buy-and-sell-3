'use strict';

const express = require(`express`);
const path = require(`path`);
const axios = require(`axios`);
const {Commands} = require(`../const`);
const apiRoutes = require(`../api`);
const {PORT} = require(`../config`);
const setHeaders = require(`../middlewares/set-headers`);
const startRequest = require(`../logger/start-request`);
const clientRoutes = require(`../../express/routes`);
const handleNotFound = require(`../../express//middlewares/handle-not-found`);
const handleError = require(`../../express/middlewares/handle-error`);
const {getLogger} = require(`../logger/logger`);
const logger = getLogger();

const STATIC_DIR = `../../express/public`;
const TEMPLATES_DIR = `../../express/templates`;

module.exports = {
  name: Commands.SERVER,
  run: (userPort) => {
    const port = userPort || PORT;

    const fetchDataService = axios.create({
      baseURL: `http://localhost:${port}/api`,
      timeout: 1000 * 5,
      withCredentials: true
    });

    const app = express();
    app.locals.title = `Куплю Продам`;
    app.locals.description = `Доска объявлений — современный веб-сайт, упрощающий продажу или покупку абсолютно любых вещей.`;

    app.use(express.static(path.resolve(__dirname, STATIC_DIR)));
    app.use(express.json());
    app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
    app.set(`view engine`, `pug`);
    app.use(setHeaders);
    app.use(startRequest);
    app.use(`/`, clientRoutes(fetchDataService));
    app.use(`/api`, apiRoutes);
    app.use(handleNotFound);
    app.use(handleError);

    app
      .listen(port, () => {
        logger.info(`Server listening on port: ${port}`);
      })
      .on(`error`, (err) => {
        logger.error(`Server can't start. Error: ${err}`);
      });
  }
};
