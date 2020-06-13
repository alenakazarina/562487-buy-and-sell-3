'use strict';

const fs = require(`fs`).promises;
const {HttpCode} = require(`../../const`);
const offerExists = require(`../../middlewares/offer-exists`);
const offerValidator = require(`../../middlewares/offer-validator`);
const updateValidator = require(`../../middlewares/update-validator`);
const uploadPicture = require(`../../middlewares/upload-picture`);
const processPicture = require(`../../utils/process-picture`);
const endRequest = require(`../../logger/end-request`);

const Routes = {
  OFFER_ROOT: `/offers`,
  OFFER: `/offers/:offerId`
};

module.exports = (app, dataService) => {
  const offerService = dataService.offer;
  const userService = dataService.user;
  const commentService = dataService.comment;

  app.get(Routes.OFFER_ROOT, (req, res) => {
    const offers = offerService.getAll();
    res.json(offers);

    endRequest(req.method, req.originalUrl, res.statusCode);
  });

  app.post(Routes.OFFER_ROOT, uploadPicture(`avatar`), offerValidator, async (req, res) => {
    const {offer} = res.locals;

    if (!offer) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      res.sendStatus(HttpCode.BAD_REQUEST);
    } else {
      const currentUser = userService.getCurrentUser();
      const newOffer = offerService.create(
          Object.assign(offer, {user: currentUser})
      );

      if (req.file) {
        await processPicture({
          picture: req.file.filename,
          width: 482,
          height: 598
        });
      }

      res.status(HttpCode.CREATED)
        .json(newOffer);
    }

    endRequest(req.method, req.originalUrl, res.statusCode);
  });

  app.put(Routes.OFFER, uploadPicture(`avatar`), offerExists(offerService), updateValidator, async (req, res) => {
    const {offerId} = req.params;
    const offerData = res.locals.offer;

    if (!offerData) {
      res.sendStatus(HttpCode.BAD_REQUEST);
    } else {
      const updatedOffer = offerService.update(offerId, offerData);

      if (req.file) {
        await processPicture({
          picture: req.file.filename,
          width: 482,
          height: 598
        });
      }

      res.status(HttpCode.OK)
        .json(updatedOffer);
    }

    endRequest(req.method, req.originalUrl, res.statusCode);
  });

  app.get(Routes.OFFER, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;

    if (!offer) {
      res.sendStatus(HttpCode.NOT_FOUND);
    } else {
      res.status(HttpCode.OK)
        .json(offer);
    }

    endRequest(req.method, req.originalUrl, res.statusCode);
  });

  app.delete(Routes.OFFER, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;

    if (!offer) {
      res.sendStatus(HttpCode.NOT_FOUND);
    } else {
      const droppedOffer = offerService.drop(offer.id);
      commentService.deleteOfferComments(droppedOffer.id);
      res.status(HttpCode.OK)
        .json(offer);
    }

    endRequest(req.method, req.originalUrl, res.statusCode);
  });
};
