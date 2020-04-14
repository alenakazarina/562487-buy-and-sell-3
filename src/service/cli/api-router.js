'use strict';
const {Router} = require(`express`);
const store = require(`./db/store`);
const {HttpCode} = require(`../const`);

const Paths = {
  OFFERS: `/offers`,
  OFFER: `/offers/:offerId`,
  CATEGORIES: `/categories`,
  COMMENTS: `/offers/:offerId/comments`,
  COMMENT: `/offers/:offerId/comments/:commentId`,
  SEARCH: `/search`
};

const apiRouter = new Router();

// GET /api/offers
apiRouter.get(Paths.OFFERS, (req, res) => {
  try {
    const offers = store.getOffers();
    res.json(offers);
  } catch (err) {
    onError(err, res);
  }
});

// GET /api/offers/:offerId
apiRouter.get(Paths.OFFER, (req, res) => {
  const {offerId} = req.params;
  try {
    const offer = store.getOfferById(offerId);
    if (offer) {
      res.status(HttpCode.OK).send(offer);
    } else {
      res.status(HttpCode.NOT_FOUND).send(`Offer with id ${offerId} was not found`);
    }
  } catch (err) {
    onError(err, res);
  }
});

// GET /api/categories
apiRouter.get(Paths.CATEGORIES, (req, res) => {
  try {
    const categories = store.getCategories();
    res.json(categories);
  } catch (err) {
    onError(err, res);
  }
});

// POST /api/offers
apiRouter.post(Paths.OFFERS, (req, res) => {
  const newOffer = req.body;
  try {
    if (!newOffer) {
      res
        .status(HttpCode.BAD_REQUEST)
        .send(`Nothing to add`);
    }

    const requiredFields = [`ticket-name`, `action`, `comment`, `avatar`, `price`, `category`];
    requiredFields.forEach((field) => {
      if (!newOffer[field]) {
        res
          .status(HttpCode.BAD_REQUEST)
          .send(`Missed offer ${field} field`);
      }
    });

    const id = store.addOffer(newOffer);
    res.status(HttpCode.CREATED).send(id);
  } catch (err) {
    onError(err, res);
  }
});

// PUT /api/offers/:offerId
apiRouter.put(Paths.OFFER, (req, res) => {
  const updatedFields = req.body;
  const {offerId} = req.params;
  try {
    const offer = store.getOfferById(offerId);
    if (!offer) {
      res
        .status(HttpCode.NOT_FOUND)
        .send(`Offer with id: ${offer.id} was not found`);
    }
    if (!updatedFields) {
      res
        .status(HttpCode.BAD_REQUEST)
        .send(`Nothing to update`);
    }

    const availableFields = [`ticket-name`, `action`, `comment`, `avatar`, `price`, `category`];
    Object.keys(updatedFields).forEach((field) => {
      const isAvailableField = availableFields.includes(field);
      if (!isAvailableField) {
        res
          .status(HttpCode.BAD_REQUEST)
          .send(`Wrong offer field: ${field}`);
      }
    });

    const id = store.updateOffer(offerId, updatedFields);
    res.status(HttpCode.NO_CONTENT).send(id);
  } catch (err) {
    onError(err, res);
  }
});

// DELETE /api/offers/:offerId
apiRouter.delete(Paths.OFFER, (req, res) => {
  const {offerId} = req.params;
  try {
    const status = store.deleteOffer(offerId);
    if (status === HttpCode.NO_CONTENT) {
      res
        .status(status)
        .send([]);
    } else {
      res
        .status(status)
        .send(`Failed to delete offer with id: ${offerId}. Not found.`);
    }
  } catch (err) {
    onError(err, res);
  }
});

// GET /api/offers/:offerId/comments
apiRouter.get(Paths.COMMENTS, (req, res) => {
  const {offerId} = req.params;
  try {
    const offer = store.getOfferById(offerId);
    if (offer) {
      res.json(offer.comments);
    } else {
      res
        .status(HttpCode.NOT_FOUND)
        .send(`Offer with id: ${offerId} was not found`);
    }
  } catch (err) {
    onError(err, res);
  }
});

// DELETE /api/offers/:offerId/comments/:commentId
apiRouter.delete(Paths.COMMENT, (req, res) => {
  const {offerId, commentId} = req.params;
  try {
    const offer = store.getOfferById(offerId);
    if (!offer) {
      res
        .status(HttpCode.NOT_FOUND)
        .send(`Offer with id: ${offerId} was not found`);
    }

    const status = store.deleteComment(offerId, commentId);
    if (status === HttpCode.NO_CONTENT) {
      res.status(status).send([]);
    } else {
      res
        .status(status)
        .send(`Comment with id: ${commentId} was not found.`);
    }
  } catch (err) {
    onError(err, res);
  }
});

// POST /api/offers/:offerId/comments
apiRouter.post(Paths.COMMENTS, (req, res) => {
  const newComment = req.body;
  const {offerId} = req.params;
  try {
    const offer = store.getOfferById(offerId);
    if (!offer) {
      res.status(HttpCode.BAD_REQUEST).send(`Offer with id: ${offerId} was not found`);
    }
    if (!newComment.comment) {
      res.status(HttpCode.BAD_REQUEST).send(`Missed comment field`);
    }

    const id = store.addComment(offerId, newComment);
    res.status(HttpCode.CREATED).send(id);
  } catch (err) {
    onError(err, res);
  }
});

// GET /api/search?query=
apiRouter.get(Paths.SEARCH, (req, res) => {
  const {query} = req.query;
  try {
    if (!query) {
      res
        .status(HttpCode.BAD_REQUEST)
        .send(`Missed search query`);
    }

    const searchResults = store.search(query);
    res.status(HttpCode.OK).send(searchResults);
  } catch (err) {
    onError(err, res);
  }
});

const onError = (err, res) => res.status(HttpCode.INTERNAL_SERVER_ERROR);

module.exports = {
  apiRouter
};
