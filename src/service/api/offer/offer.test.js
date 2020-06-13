'use strict';

const request = require(`supertest`);
const {app, offersData, postOfferData, postOfferFalseData} = require(`../tests-mocks`);

const Ids = {
  OFFER: `1`,
  OFFER_DEL: `2`,
  OFFER_NOT_FOUND: `3`
};

const Routes = {
  OFFERS: `/api/offers`,
  OFFER: `/api/offers/${Ids.OFFER}`,
  OFFER_DEL: `/api/offers/${Ids.OFFER_DEL}`,
  OFFER_NOT_FOUND: `/api/offers/${Ids.OFFER_NOT_FOUND}`
};

test(`When GET offers status code should be 200`, () => {
  return request(app)
    .get(Routes.OFFERS)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
});

test(`When GET offer status code should be 200`, () => {
  return request(app)
    .get(Routes.OFFER)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject(offersData[0]);
    });
});

test(`When GET offer status code should be 404`, () => {
  return request(app)
    .get(Routes.OFFER_NOT_FOUND)
    .then((res) => {
      expect(res.statusCode).toBe(404);
    });
});

test(`When POST offer status code should be 201`, () => {
  return request(app)
    .post(Routes.OFFERS)
    .send(postOfferData)
    .then((res) => {
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe(`Sony Playstation 5.`);
    });
});

test(`When POST offer status code should be 400`, () => {
  return request(app)
    .post(Routes.OFFERS)
    .send(postOfferFalseData)
    .then((res) => {
      expect(res.statusCode).toBe(400);
    });
});

test(`When PUT offer status code should be 200`, () => {
  return request(app)
    .put(Routes.OFFER)
    .send(postOfferData)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(`Sony Playstation 5.`);
    });
});

test(`When PUT offer status code should be 400`, () => {
  return request(app)
    .put(Routes.OFFER)
    .send(postOfferFalseData)
    .then((res) => {
      expect(res.statusCode).toBe(400);
    });
});

test(`When DELETE offer status code should be 200`, () => {
  return request(app)
    .delete(Routes.OFFER_DEL)
    .then((res) => {
      expect(res.statusCode).toBe(200);
    });
});

test(`When DELETE offer status code should be 404`, () => {
  return request(app)
    .delete(Routes.OFFER_NOT_FOUND)
    .then((res) => {
      expect(res.statusCode).toBe(404);
    });
});

