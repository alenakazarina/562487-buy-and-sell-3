'use strict';

const fs = require(`fs`).promises;
const {HttpCode} = require(`../../const`);
const userValidator = require(`../../middlewares/user-validator`);
const userExists = require(`../../middlewares/user-exists`);
const passwordValidator = require(`../../middlewares/password-validator`);
const uploadPicture = require(`../../middlewares/upload-picture`);
const processPicture = require(`../../utils/process-picture`);
const endRequest = require(`../../logger/end-request`);

module.exports = (app, dataService) => {
  const userService = dataService.user;

  app.get(`/user`, (req, res) => {
    const user = userService.getCurrentUser();
    res.json(user);

    endRequest(req.method, req.originalUrl, res.statusCode);
  });

  app.post(`/login`, userExists(userService), passwordValidator, async (req, res) => {
    const appUser = res.locals.user;

    if (!appUser) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      res.sendStatus(HttpCode.BAD_REQUEST);
    } else {
      const user = userService.login(appUser);
      res.json(user);
    }

    endRequest(req.method, req.originalUrl, res.statusCode);
  });

  app.post(`/register`, uploadPicture(`avatar`), userExists(userService), userValidator, async (req, res) => {
    const appUser = res.locals.user;
    if (!appUser) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      res.sendStatus(HttpCode.BAD_REQUEST);
    } else {
      const newUser = userService.createUser(appUser);
      if (req.file) {
        await processPicture({
          picture: req.file.filename,
          width: 148,
          height: 148
        });
      }
      res.status(HttpCode.CREATED)
        .json(newUser);
    }

    endRequest(req.method, req.originalUrl, res.statusCode);
  });
};
