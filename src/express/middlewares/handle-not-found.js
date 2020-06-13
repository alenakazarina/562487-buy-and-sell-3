'use strict';

module.exports = (req, res) => {
  const notFoundPageContent = {
    page: `404`,
    statusCode: 404,
    statusText: `Страница не найдена`
  };
  res
    .status(`404`)
    .render(`404`, notFoundPageContent);
};
