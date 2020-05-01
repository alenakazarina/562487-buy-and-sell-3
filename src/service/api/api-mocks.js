'use strict';

const offerData = {
  'ticket-name': `Куплю приставку Sony Playstation 5.`,
  'action': `offer`,
  'comment': `Заберу сам 🚚... Только в рабочем состоянии 🙏🏽.`,
  'price': `5151`,
  'avatar': `avatar.jpg`,
  'category': [`Разное`, `Игры`]
};

const updateData = {
  'ticket-name': `Куплю Sony Playstation 5.`,
  'price': `5000`
};

const commentData = {
  'comment': `Почему так дешёво? Оно в ужасном состоянии?`
};

const offerFalseData = {
  'ticket-name': `Куплю приставку Sony Playstation 5.`,
  'comment': `Заберу сам 🚚... Только в рабочем состоянии 🙏🏽.`,
  'price': `5151`,
  'avatar': `avatar.jpg`,
  'category': [`Разное`, `Игры`]
};

const updateFalseData = {
  'title': `Куплю Sony Playstation 5.`,
  'price': `5000`
};

const commentFalseData = {
  'text': `Почему так дешёво? Оно в ужасном состоянии?`
};

module.exports = {
  offerData,
  updateData,
  commentData,
  offerFalseData,
  updateFalseData,
  commentFalseData
};
