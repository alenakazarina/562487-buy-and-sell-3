'use strict';

const {Router} = require(`express`);
const commonRouter = require(`./common`);
const myRouter = require(`./my`);
const offersRouter = require(`./offers`);

const app = new Router();

module.exports = (service) => {
  app.use(`/`, commonRouter(service));
  app.use(`/offers`, offersRouter(service));
  app.use(`/my`, myRouter(service));
  return app;
};
