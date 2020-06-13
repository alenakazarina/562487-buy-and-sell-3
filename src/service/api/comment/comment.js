'use strict';

const {HttpCode} = require(`../../const`);
const commentExists = require(`../../middlewares/comment-exists`);
const commentValidator = require(`../../middlewares/comment-validator`);
const endRequest = require(`../../logger/end-request`);

const Routes = {
  COMMENTS_ROOT: `/offers/:offerId/comments`,
  COMMENT: `/offers/:offerId/comments/:commentId`
};

module.exports = (app, dataService) => {
  const commentService = dataService.comment;
  const userService = dataService.user;
  const offerService = dataService.offer;

  app.get(Routes.COMMENTS_ROOT, (req, res) => {
    const comments = commentService.getByOfferId(req.params.offerId);
    res.status(HttpCode.OK)
      .json(comments);

    endRequest(req.method, req.originalUrl, res.statusCode);
  });

  app.post(Routes.COMMENTS_ROOT, commentValidator, (req, res) => {
    const comment = res.locals.comment;
    if (!comment) {
      res.sendStatus(HttpCode.BAD_REQUEST);
    } else {
      const {offerId} = req.params;
      const appUser = userService.getCurrentUser();
      const newComment = commentService.create(offerId, comment, appUser);
      offerService.addComment(offerId, newComment);

      res.status(HttpCode.CREATED)
        .json(newComment);
    }

    endRequest(req.method, req.originalUrl, res.statusCode);
  });

  app.delete(Routes.COMMENT, commentExists(commentService), (req, res) => {
    const {offerId} = req.params;
    const comment = res.locals.comment;

    if (!comment) {
      res.sendStatus(HttpCode.NOT_FOUND);
    } else {
      const droppedComment = commentService.drop(comment);
      offerService.deleteComment(offerId, droppedComment.id);

      res.status(HttpCode.OK)
        .json(droppedComment);
    }

    endRequest(req.method, req.originalUrl, res.statusCode);
  });
};
