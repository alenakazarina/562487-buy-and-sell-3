'use strict';

const request = require(`supertest`);
const {app} = require(`../tests-mocks`);

const CATEGORY_ROUTE = `/api/categories`;

test(`When GET categories status code should be 200`, () => {
  return request(app)
    .get(CATEGORY_ROUTE)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
});
