'use strict';
const {Router} = require(`express`);
const {HttpCode} = require(`../const`);
const {getLogger} = require(`../logger`);
const logger = getLogger({name: `rest-api`});

class API {
  constructor(store) {
    this._router = new Router();
    this._store = store;
  }

  getRoutes() {
    return {
      OFFERS: `/offers`,
      OFFER: `/offers/:offerId`,
      CATEGORIES: `/categories`,
      COMMENTS: `/offers/:offerId/comments`,
      COMMENT: `/offers/:offerId/comments/:commentId`,
      SEARCH: `/search`
    };
  }

  getRequiredFields() {
    return [
      `ticket-name`,
      `action`,
      `comment`,
      `avatar`,
      `price`,
      `category`
    ];
  }

  start() {
    const api = this._router;
    const store = this._store;
    const Paths = this.getRoutes();
    const requiredFields = this.getRequiredFields();

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
        const hasRequiredPropsLength = Object.keys(newOffer).length === requiredFields.length;

        if (!hasRequiredPropsLength) {
          res
            .status(HttpCode.BAD_REQUEST)
            .send({message: `Incorrect required fields count`});
          logger.error(`Create offer error: ${res.statusCode}`);
          return;
        }

        for (let offerField of requiredFields) {
          if (!newOffer[offerField]) {
            res
              .status(HttpCode.BAD_REQUEST)
              .send({message: `Missed offer field: ${offerField}`});
            logger.error(`Create offer error: ${res.statusCode}`);
            return;
          }
        }

        const offer = await store.createOffer(newOffer);
        res.status(HttpCode.CREATED).json(offer);
        logger.info(`Create offer ${offer.id} success: ${res.statusCode}`);
      } catch (err) {
        onError(err, res);
      }
    });

    api.put(Paths.OFFER, async (req, res) => {
      try {
        const updatedFields = req.body;
        const {offerId} = req.params;

        const isNoUpdates = Object.keys(updatedFields).length === 0;
        const hasWrongFields = Object.keys(updatedFields).filter((field) => requiredFields.includes(field) === false).length;

        if (isNoUpdates || hasWrongFields) {
          res
            .status(HttpCode.BAD_REQUEST)
            .send({message: `Update offer ${offerId} error`});
          logger.error(`Update offer ${offerId} error: ${res.statusCode}`);
          return;
        }

        const offer = await store.updateOffer(offerId, updatedFields);

        if (!offer) {
          res
            .status(HttpCode.NOT_FOUND)
            .send({message: `Offer with id: ${offerId} was not found`});
          logger.error(`Update offer ${offerId} error: ${res.statusCode}`);
          return;
        }

        res.status(HttpCode.OK).json(offer);
        logger.info(`Update offer ${offerId} success: ${res.statusCode}`);
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
        logger.info(`Delete offer ${offerId} success: ${res.statusCode}`);
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
            .send({message: `Delete offer ${offerId} comment ${commentId} 404`});
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
            .send({message: `Create offer ${offerId} comment error`});
          logger.error(`Create offer ${offerId} comment error: ${res.statusCode}`);
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
          logger.error(`Get search error: ${res.statusCode}`);
          return;
        }

        const searchResults = await store.search(query);
        res.status(HttpCode.OK).json(searchResults);
        logger.info(`Get search success: ${res.statusCode}`);
      } catch (err) {
        onError(err, res);
      }
    });

    const onError = (err, res) => {
      res.status(HttpCode.INTERNAL_SERVER_ERROR);
      logger.error(err);
    };

    return api;
  }
}

module.exports = {
  API
};
