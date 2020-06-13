'use strict';

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const errorPageContent = {
    page: `500`,
    statusCode: 500,
    statusText: `Ошибка cервера`
  };
  return res.status(`500`)
    .render(`500`, errorPageContent);
};
