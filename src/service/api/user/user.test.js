'use strict';

const request = require(`supertest`);
const {app} = require(`../tests-mocks`);
const {loginUserData, falseLoginUserData,
  postUserData, falsePostUserData} = require(`../tests-mocks`);

const Routes = {
  USER: `/api/user`,
  LOGIN: `/api/login`,
  REGISTER: `/api/register`
};

test(`When GET current user status code should be 200`, () => {
  return request(app)
    .get(Routes.USER)
    .then((res) => {
      expect(res.statusCode).toBe(200);
    });
});

// this test should be before the next test
test(`When POST false user login status code should be 400`, () => {
  return request(app)
    .post(Routes.LOGIN)
    .send(falseLoginUserData)
    .then((res) => {
      expect(res.statusCode).toBe(400);
    });
});

test(`When POST user login status code should be 200`, () => {
  return request(app)
    .post(Routes.LOGIN)
    .send(loginUserData)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe(loginUserData[`email`]);
    });
});

test(`When POST new user status code should be 201`, () => {
  return request(app)
    .post(Routes.REGISTER)
    .send(postUserData)
    .then((res) => {
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe(postUserData[`user-name`]);
      expect(res.body.email).toBe(postUserData[`user-email`]);
    });
});

test(`When POST incorrect user status code should be 400`, () => {
  return request(app)
    .post(Routes.REGISTER)
    .send(falsePostUserData)
    .then((res) => {
      expect(res.statusCode).toBe(400);
    });
});
