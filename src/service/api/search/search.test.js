'use strict';

const request = require(`supertest`);
const {app} = require(`../tests-mocks`);

const Routes = {
  SEARCH: `/api/search?query=аппарат`,
  SEARCH_EMPTY: `/api/search?query=`
};

test(`When GET search status code should be 200`, () => {
  const searchRoute = encodeURI(Routes.SEARCH);
  return request(app)
    .get(searchRoute)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
    });
});

test(`When GET search return empty status code should be 200`, () => {
  const searchRoute = encodeURI(Routes.SEARCH_EMPTY);
  return request(app)
    .get(searchRoute)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
    });
});
