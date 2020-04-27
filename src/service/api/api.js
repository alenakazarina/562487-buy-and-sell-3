'use strict';
const {Router} = require(`express`);
const {Store} = require(`../db/store`);
const {HttpCode} = require(`../const`);
const {getLogger} = require(`../logger/logger`);
const logger = getLogger({name: `rest-api`});

const REQUIRED_OFFER_FIELDS = [
  `ticket-name`,
  `action`,
  `comment`,
  `avatar`,
  `price`,
  `category`
];

const Paths = {
  OFFERS: `/offers`,
  OFFER: `/offers/:offerId`,
  CATEGORIES: `/categories`,
  COMMENTS: `/offers/:offerId/comments`,
  COMMENT: `/offers/:offerId/comments/:commentId`,
  SEARCH: `/search`
};

const api = new Router();
const store = new Store();
store.init();

api.get(Paths.OFFERS, async (req, res) => {
  try {
    const offers = await store.getOffers();
    res.status(HttpCode.OK).json(offers);
    logger.info(`Get offers success: ${res.statusCode}`);
  } catch (err) {
    onError(err, res);
  }
});

api.get(Paths.OFFER, async (req, res) => {
  try {
    const {offerId} = req.params;
    const offer = await store.getOfferById(offerId);

    if (!offer) {
      res
        .status(HttpCode.NOT_FOUND)
        .send({message: `Offer with id ${offerId} was not found`});
      logger.error(`Get offer ${offerId} error: ${res.statusCode}`);
      return;
    }

    res.status(HttpCode.OK).json(offer);
    logger.info(`Get offer ${offerId} success: ${res.statusCode}`);
  } catch (err) {
    onError(err, res);
  }
});

api.get(Paths.CATEGORIES, async (req, res) => {
  try {
    const categories = await store.getCategories();
    res.status(HttpCode.OK).json(categories);
    logger.info(`Get categories success: ${res.statusCode}`);
  } catch (err) {
    onError(err, res);
  }
});

api.post(Paths.OFFERS, async (req, res) => {
  try {
    const newOffer = req.body;
    const hasRequiredPropsLength = Object.keys(newOffer).length === REQUIRED_OFFER_FIELDS.length;

    if (!hasRequiredPropsLength) {
      res
        .status(HttpCode.BAD_REQUEST)
        .send({message: `Incorrect required fields count`});
      logger.error(`Post offer error: ${res.statusCode}`);
      return;
    }

    for (let offerField of REQUIRED_OFFER_FIELDS) {
      if (!newOffer[offerField]) {
        res
          .status(HttpCode.BAD_REQUEST)
          .send({message: `Missed offer field: ${offerField}`});
        logger.error(`Post offer error: ${res.statusCode}`);
        return;
      }
    }

    const offer = await store.createOffer(newOffer);
    res.status(HttpCode.CREATED).json(offer);
    logger.info(`Offer ${offer.id} was created successfully: ${res.statusCode}`);
  } catch (err) {
    onError(err, res);
  }
});

api.put(Paths.OFFER, async (req, res) => {
  try {
    const updatedFields = req.body;
    const {offerId} = req.params;
    const offer = await store.getOfferById(offerId);

    const isNoUpdates = Object.keys(updatedFields).length === 0;
    const hasWrongFields = Object.keys(updatedFields).filter((field) => REQUIRED_OFFER_FIELDS.includes(field) === false).length;

    if (!offer) {
      res
        .status(HttpCode.NOT_FOUND)
        .send({message: `Update offer ${offerId} error`});
      logger.error(`Update offer ${offerId} error: ${res.statusCode}`);
      return;
    }

    if (isNoUpdates || hasWrongFields) {
      res
        .status(HttpCode.BAD_REQUEST)
        .send({message: `Update offer ${offerId} error`});
      logger.error(`Update offer ${offerId} error: ${res.statusCode}`);
      return;
    }

    const updatedOffer = await store.updateOffer(offerId, updatedFields);
    res.status(HttpCode.OK).json(updatedOffer);
    logger.info(`Offer ${offerId} was updated successfully: ${res.statusCode}`);
  } catch (err) {
    onError(err, res);
  }
});

api.delete(Paths.OFFER, async (req, res) => {
  try {
    const {offerId} = req.params;
    const offer = await store.deleteOffer(offerId);

    if (!offer) {
      res
        .status(HttpCode.NOT_FOUND)
        .send({message: `Delete offer ${offerId} error`});
      logger.error(`Delete offer ${offerId} error: ${res.statusCode}`);
      return;
    }

    res.status(HttpCode.OK).json(offer);
    logger.info(`Offer ${offerId} was deleted successfully: ${res.statusCode}`);
  } catch (err) {
    onError(err, res);
  }
});

api.get(Paths.COMMENTS, async (req, res) => {
  try {
    const {offerId} = req.params;
    const offer = await store.getOfferById(offerId);

    if (!offer) {
      res
        .status(HttpCode.NOT_FOUND)
        .send({message: `Offer with id: ${offerId} was not found`});
      logger.error(`Get offer ${offerId} comments error: ${res.statusCode}`);
      return;
    }

    res.status(HttpCode.OK).json(offer.comments);
    logger.info(`Get offer ${offerId} comments success: ${res.statusCode}`);
  } catch (err) {
    onError(err, res);
  }
});

api.delete(Paths.COMMENT, async (req, res) => {
  try {
    const {offerId, commentId} = req.params;
    const comment = await store.deleteComment(offerId, commentId);

    if (!comment) {
      res
        .status(HttpCode.NOT_FOUND)
        .send({message: `Delete offer ${offerId} comment ${commentId} error: ${res.statusCode}`});
      logger.error(`Delete offer ${offerId} comment ${commentId} error: ${res.statusCode}`);
      return;
    }

    res.status(HttpCode.OK).json(comment);
    logger.info(`Delete offer ${offerId} comment ${commentId} success: ${res.statusCode}`);
  } catch (err) {
    onError(err, res);
  }
});

api.post(Paths.COMMENTS, async (req, res) => {
  try {
    const newComment = req.body;
    const {offerId} = req.params;

    const hasNoRequiredField = newComment.comment === undefined;
    const comment = await store.addComment(offerId, newComment);

    if (!comment || hasNoRequiredField) {
      res
        .status(HttpCode.BAD_REQUEST)
        .send({message: `POST offer ${offerId} comment error`});
      logger.error(`POST offer ${offerId} comment error: ${res.statusCode}`);
      return;
    }

    res.status(HttpCode.CREATED).json(comment);
    logger.info(`Create offer ${offerId} comment ${comment.id} success: ${res.statusCode}`);
  } catch (err) {
    onError(err, res);
  }
});

api.get(Paths.SEARCH, async (req, res) => {
  try {
    const {query} = req.query;

    if (!query) {
      res
        .status(HttpCode.BAD_REQUEST)
        .send({message: `Missed search query`});
      logger.error(`Search error: ${res.statusCode}`);
      return;
    }

    const searchResults = await store.search(query);
    res.status(HttpCode.OK).json(searchResults);
    logger.info(`Search ${query} success: ${res.statusCode}`);
  } catch (err) {
    onError(err, res);
  }
});

const onError = (err, res) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR);
  logger.error(err);
};

module.exports = {
  api
};
