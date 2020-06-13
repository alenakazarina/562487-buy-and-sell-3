'use strict';

const request = require(`supertest`);
const {app, postCommentData, postCommentFalseData} = require(`../tests-mocks`);

const Ids = {
  OFFER: `1`,
  COMMENT: `1`,
  NOT_FOUND: `3`
};

const Routes = {
  COMMENTS: `/api/offers/${Ids.OFFER}/comments`,
  COMMENT: `/api/offers/${Ids.OFFER}/comments/${Ids.COMMENT}`,
  COMMENT_NOT_FOUND: `/api/offers/${Ids.OFFER}/comments/${Ids.NOT_FOUND}`
};

test(`When GET comments status code should be 200`, () => {
  return request(app)
    .get(Routes.COMMENTS)
    .then((res) => {
      expect(res.statusCode).toBe(200);
    });
});

test(`When POST comment status code should be 201`, () => {
  return request(app)
    .post(Routes.COMMENTS)
    .send(postCommentData)
    .then((res) => {
      expect(res.statusCode).toBe(201);
      expect(res.body.text).toBe(`Почему так дешёво? Оно в ужасном состоянии?`);
    });
});

test(`When POST comment status code should be 400`, () => {
  return request(app)
    .post(Routes.COMMENTS)
    .send(postCommentFalseData)
    .then((res) => {
      expect(res.statusCode).toBe(400);
    });
});

test(`When DELETE comment status code should be 200`, () => {
  return request(app)
    .delete(Routes.COMMENT)
    .then((res) => {
      expect(res.statusCode).toBe(200);
    });
});

test(`When DELETE comment status code should be 404`, () => {
  return request(app)
    .delete(Routes.COMMENT_NOT_FOUND)
    .then((res) => {
      expect(res.statusCode).toBe(404);
    });
});
