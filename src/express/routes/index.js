'use strict';

const {Router} = require(`express`);
const commonRouter = require(`./common`);
const myRouter = require(`./my`);
const offersRouter = require(`./offers`);

const app = new Router();

app.use(`/`, commonRouter);
app.use(`/offers`, offersRouter);
app.use(`/my`, myRouter);

module.exports = app;
