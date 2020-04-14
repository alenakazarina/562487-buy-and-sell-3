'use strict';
const express = require(`express`);
const {apiRouter} = require(`./api-router`);
const {Commands, HttpCode, InputData} = require(`../const`);
const store = require(`./db/store`);

module.exports = {
  name: Commands.SERVER,
  run: (count) => {
    const port = Number.parseInt(count, 10) || InputData.DEFAULT_PORT;
    const server = express();
    store.init();
    server.use(express.urlencoded({extended: false}));
    server.use(express.json());
    server.use(`/api`, apiRouter);
    server.use((req, res) => (
      res
        .status(HttpCode.NOT_FOUND)
        .send(`Not found`)
    ));

    server.listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    });
  }
};
