'use strict';

const request = require(`supertest`);
const express = require(`express`);
const {api} = require(`./api`);
const mocks = require(`./api-mocks`);

const DEL_OFFER_ID = `WpQXW_`;
const DEL_COMMENT_ID = `6SJQjR`;

const Paths = {
  OFFERS: `/api/offers`,
  OFFER: `/api/offers/Y1R6W2`,
  CATEGORIES: `/api/categories`,
  COMMENTS: `/api/offers/Y1R6W2/comments`,
  COMMENT: `/api/offers/Y1R6W2/comments/virgVq`,
  SEARCH: `/api/search?query=куплю`,
  OFFER_DEL: `/api/offers/WpQXW_`,
  COMMENT_DEL: `/api/offers/wtLQZQ/comments/${DEL_COMMENT_ID}`,
  OFFER_NOT_FOUND: `/api/offers/Y1R6W3`,
  COMMENTS_NOT_FOUND: `/api/offers/Y1R6W3/comments`,
  COMMENT_NOT_FOUND: `/api/offers/wtLQZQ/comments/6SJQjG`,
  SEARCH_EMPTY: `/api/search?query=`
};

let server = null;
const app = express();

beforeAll(() => {
  app.use(express.json());
  app.use(`/api`, api);
  app.use((req, res) => {
    res
      .status(404)
      .send({message: `not found`});
  });
  server = app.listen(3000);
});

afterAll(() => {
  server.close();
});

describe(`api`, () => {
  describe(`GET offers`, () => {
    test(`When get offers status code should be 200`, async () => {
      const res = await request(app).get(Paths.OFFERS);
      expect(res.statusCode).toBe(200);
    });
  });

  describe(`GET categories`, () => {
    test(`When get categories status code should be 200`, async () => {
      const res = await request(app).get(Paths.CATEGORIES);
      expect(res.statusCode).toBe(200);
    });
  });

  describe(`GET offer`, () => {
    test(`When get offer status code should be 200`, async () => {
      const res = await request(app).get(Paths.OFFER);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(`id`);
      expect(res.body).toHaveProperty(`title`);
      expect(res.body).toHaveProperty(`type`);
      expect(res.body).toHaveProperty(`description`);
      expect(res.body).toHaveProperty(`sum`);
      expect(res.body).toHaveProperty(`picture`);
      expect(res.body).toHaveProperty(`category`);
      expect(res.body).toHaveProperty(`comments`);
    });

    test(`When get offer error 404`, async () => {
      const res = await request(app).get(Paths.OFFER_NOT_FOUND);
      expect(res.statusCode).toBe(404);
    });
  });

  describe(`GET offer comments`, () => {
    test(`When get offer comments status code should be 200`, async () => {
      const res = await request(app).get(Paths.COMMENTS);
      expect(res.statusCode).toBe(200);
    });

    test(`When get offer comments error 404`, async () => {
      const res = await request(app).get(Paths.COMMENTS_NOT_FOUND);
      expect(res.statusCode).toBe(404);
    });
  });

  describe(`GET search`, () => {
    test(`When get search status code should be 200`, async () => {
      const searchPath = encodeURI(Paths.SEARCH);
      const res = await request(app).get(searchPath);
      expect(res.statusCode).toBe(200);
    });

    test(`When get search error 400`, async () => {
      const searchPath = encodeURI(Paths.SEARCH_EMPTY);
      const res = await request(app).get(searchPath);
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`PUT offer`, () => {
    test(`When update offer status code should be 200`, async () => {
      const res = await request(app).put(Paths.OFFER).send(mocks.updateData);
      expect(res.statusCode).toBe(200);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(`title`, `Куплю Sony Playstation 5.`);
      expect(res.body).toHaveProperty(`sum`, `5000`);
    });

    test(`When update offer error 400`, async () => {
      const res = await request(app).put(Paths.OFFER).send(mocks.updateFalseData);
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`POST offer`, () => {
    test(`When post offer status code should be 201`, async () => {
      const res = await request(app).post(Paths.OFFERS).send(mocks.offerData);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty(`id`);
      expect(res.body).toHaveProperty(`title`, mocks[`offerData`][`ticket-name`]);
      expect(res.body).toHaveProperty(`type`, mocks[`offerData`][`action`]);
      expect(res.body).toHaveProperty(`description`, mocks[`offerData`][`comment`]);
      expect(res.body).toHaveProperty(`sum`, mocks[`offerData`][`price`]);
      expect(res.body).toHaveProperty(`picture`, mocks[`offerData`][`avatar`]);
      expect(res.body).toHaveProperty(`category`, mocks[`offerData`][`category`]);
      expect(res.body).toHaveProperty(`comments`);
    });

    test(`When post offer error 400`, async () => {
      const res = await request(app).post(Paths.OFFERS).send(mocks.offerFalseData);
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`POST offer comment`, () => {
    test(`When post offer comment status code should be 201`, async () => {
      const res = await request(app).post(Paths.COMMENTS).send(mocks.commentData);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty(`id`);
      expect(res.body).toHaveProperty(`text`, mocks[`commentData`][`comment`]);
    });

    test(`When post offer comment error 400`, async () => {
      const res = await request(app).post(Paths.COMMENTS).send(mocks.commentFalseData);
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`DELETE offer`, () => {
    test(`When delete offer status code should be 200`, async () => {
      const res = await request(app).delete(Paths.OFFER_DEL);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(`id`, DEL_OFFER_ID);
    });

    test(`When delete offer error 404`, async () => {
      const res = await request(app).delete(Paths.OFFER_NOT_FOUND);
      expect(res.statusCode).toBe(404);
    });
  });

  describe(`DELETE offer comment`, () => {
    test(`When delete offer comment status code should be 200`, async () => {
      const res = await request(app).delete(Paths.COMMENT_DEL);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(`id`, DEL_COMMENT_ID);
    });

    test(`When delete offer comment error 404`, async () => {
      const res = await request(app).delete(Paths.COMMENT_NOT_FOUND);
      expect(res.statusCode).toBe(404);
    });
  });
});

