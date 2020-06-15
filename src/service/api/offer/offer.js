'use strict';

const {HttpCode} = require(`../../const`);
const offerExists = require(`../../middlewares/offer-exists`);
const offerValidator = require(`../../middlewares/offer-validator`);
const getUser = require(`../../middlewares/get-current-user`);
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

  app.post(Routes.OFFER_ROOT, getUser(userService), offerValidator, async (req, res) => {
    const {currentUser, offerData} = res.locals;
    if (!offerData) {
      res.sendStatus(HttpCode.BAD_REQUEST);
    } else {
      const newOffer = offerService.create(
          Object.assign(offerData, {user: currentUser})
      );

      if (newOffer) {
        res.status(HttpCode.CREATED)
          .json(newOffer);
      } else {
        res.sendStatus(HttpCode.BAD_REQUEST);
      }
    }

    endRequest(req.method, req.originalUrl, res.statusCode);
  });

  app.put(Routes.OFFER, getUser(userService), offerValidator, offerExists(offerService), async (req, res) => {
    const {currentUser, offerData, dbOffer} = res.locals;
    if (!offerData || !dbOffer) {
      res.sendStatus(HttpCode.BAD_REQUEST);
    } else {
      if (!offerData.picture) {
        offerData.picture = dbOffer.picture;
        offerData.pictureSrcset = dbOffer.pictureSrcset;
      }
      const updateData = Object.assign(dbOffer, offerData, {
        user: currentUser
      });
      const updatedOffer = offerService.update(updateData);
      res.json(updatedOffer);
    }

    endRequest(req.method, req.originalUrl, res.statusCode);
  });

  app.get(Routes.OFFER, offerExists(offerService), (req, res) => {
    const {dbOffer} = res.locals;

    if (!dbOffer) {
      res.sendStatus(HttpCode.NOT_FOUND);
    } else {
      res.status(HttpCode.OK)
        .json(dbOffer);
    }

    endRequest(req.method, req.originalUrl, res.statusCode);
  });

  app.delete(Routes.OFFER, offerExists(offerService), (req, res) => {
    const {dbOffer} = res.locals;

    if (!dbOffer) {
      res.sendStatus(HttpCode.NOT_FOUND);
    } else {
      const droppedOffer = offerService.drop(dbOffer.id);
      commentService.deleteOfferComments(droppedOffer.id);
      res.status(HttpCode.OK)
        .json(dbOffer);
    }

    endRequest(req.method, req.originalUrl, res.statusCode);
  });
};
