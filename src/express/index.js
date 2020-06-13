'use strict';

const express = require(`express`);
const path = require(`path`);
const commonRouter = require(`./routes/common`);
const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);
const setAppUser = require(`./middlewares/set-app-user`);
const handleNotFound = require(`./middlewares/handle-not-found`);
const handleError = require(`./middlewares/handle-error`);

const PUBLIC_DIR = `public`;
const app = express();

app.locals.title = `Куплю Продам`;
app.locals.description = `Доска объявлений — современный веб-сайт, упрощающий продажу или покупку абсолютно любых вещей.`;

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.json());
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);
app.use(setAppUser);
app.use(`/`, commonRouter);
app.use(`/offers`, offersRouter);
app.use(`/my`, myRouter);
app.use(handleNotFound);
app.use(handleError);

module.exports = app;

