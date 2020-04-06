'use strict';
const express = require(`express`);
const {commonRouter} = require(`./routes/common`);
const {offersRouter} = require(`./routes/offers`);
const {myRouter} = require(`./routes/my`);

const PORT = 8080;
const PUBLIC_DIR = `./src/express/templates`;
const server = express();

server.set(`views`, PUBLIC_DIR);
server.set(`view engine`, `pug`);
server.use(express.static(PUBLIC_DIR));


server.use((err, req, res, next) => {
  if (err.status === 404) {
    const notFoundPageContent = {
      page: `404`,
      statusCode: 404,
      statusText: `Страница не найдена`
    };
    res
      .status(404)
      .render(`404`, notFoundPageContent);
  }

  if (err.status === 500) {
    const errorPageContent = {
      page: `500`,
      statusCode: 500,
      statusText: `Ошибка cервера`
    };
    res
      .status(500)
      .render(`500`, errorPageContent);
  }
  next();
});
server.use(`/`, commonRouter);
server.use(`/offers`, offersRouter);
server.use(`/my`, myRouter);

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
