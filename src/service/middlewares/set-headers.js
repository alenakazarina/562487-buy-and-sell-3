'use strict';

module.exports = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `http://localhost:8080`);
  res.header(`Access-Control-Allow-Methods`, `OPTIONS, GET, POST, PUT, DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};
