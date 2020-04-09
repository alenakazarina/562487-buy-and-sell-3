'use strict';
const express = require(`express`);
const fs = require(`fs`).promises;
const {Commands, HttpCode, DataPath, InputData} = require(`../const`);

module.exports = {
  name: Commands.SERVER,
  run: (count) => {
    const port = Number.parseInt(count, 10) || InputData.DEFAULT_PORT;

    const server = express();
    server.use(express.json());
    server.get(`/offers`, async (req, res) => {
      try {
        const fileContent = await fs.readFile(DataPath.OUT);
        if (fileContent.length) {
          const mocks = JSON.parse(fileContent);
          res.json(mocks);
        } else {
          res.json([]);
        }
      } catch (err) {
        if (err.code === `ENOENT`) {
          res.json([]);
        } else {
          res
            .status(HttpCode.INTERNAL_SERVER_ERROR)
            .send(err);
        }
      }
    });

    server.use((req, res) => (
      res
        .status(HttpCode.NOT_FOUND)
        .send(`Not Found`)
    ));

    server.listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    });
  }
};
