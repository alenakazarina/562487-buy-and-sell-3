'use strict';

const express = require(`express`);
const {Router} = require(`express`);
const category = require(`./category/category`);
const offer = require(`./offer/offer`);
const search = require(`./search/search`);
const comment = require(`./comment/comment`);
const user = require(`./user/user`);
const DataService = require(`../data-service`);

const usersData = [{
  id: 1,
  name: `Денис Шкатулкин`,
  email: `shkatulkin@ya.ru`,
  avatar: `/img/avatar01.jpg`,
  avatarSrcset: `/img/avatar01@2x.jpg`,
  password: `123`
}, {
  id: 2,
  name: `Александр Бурый`,
  email: `alex@gmail.com`,
  avatar: `/img/avatar02.jpg`,
  avatarSrcset: `/img/avatar02@2x.jpg`,
  password: `123`
}];

const categoriesData = [{
  id: 1,
  title: `Мебель`,
  picture: `cat1.jpg`,
  pictureSrcset: `cat1@2x.jpg`,
  count: 0
}, {
  id: 2,
  title: `Книги`,
  picture: `cat2.jpg`,
  pictureSrcset: `cat2@2x.jpg`,
  count: 0
}];

const comments = [{
  id: `1`,
  text: `У меня есть то, что Вам нужно!`,
  user: usersData[0]
}, {
  id: `2`,
  text: `Совсем немного...`,
  user: usersData[1]
}];

const offersData = [
  {
    id: `1`,
    type: `offer`,
    title: `Самогонный аппарат авторской сборки.`,
    description: `Поделись в соцсетях и получи бонусом стикеры 🎁.`,
    sum: 1620,
    picture: `item10.jpg`,
    pictureSrcset: `item10@2x.jpg`,
    category: categoriesData.slice(0, 1),
    comments: comments.slice(0, 1),
    user: usersData[0]
  },
  {
    id: `2`,
    type: `sell`,
    title: `Коллекция журналов «Огонёк»`,
    description: `Продаю с болью в сердце 💔... Немного заляпано свежим кофе ☕️.`,
    sum: 500,
    picture: `item11.jpg`,
    pictureSrcset: `item11@2x.jpg`,
    category: categoriesData.slice(-1),
    comments: comments.slice(-1),
    user: usersData[1]
  }
];

const postOfferData = {
  'title': `Sony Playstation 5.`,
  'type': `offer`,
  'description': `Заберу сам 🚚... Только в рабочем состоянии 🙏🏽.`,
  'sum': `5151`,
  'category': [`1`]
};

const postOfferFalseData = {
  'title': `Sony Playstation 5.`,
  'type': `offer`,
  'description': `Заберу сам 🚚... Только в рабочем состоянии 🙏🏽.`,
  'sum': `5151`
};

const postCommentData = {
  'text': `Почему так дешёво? Оно в ужасном состоянии?`
};

const postCommentFalseData = {
  'comment': `Почему так дешёво? Оно в ужасном состоянии?`
};

const loginUserData = {
  email: usersData[0][`email`],
  password: usersData[0][`password`]
};

const falseLoginUserData = {
  email: usersData[0][`email`],
  password: `321`
};

const postUserData = {
  "user-name": `Alena`,
  "user-email": `alena1@gmail.com`,
  "user-password": `123`,
  "user-password-again": `123`
};

const falsePostUserData = {
  "user-name": `Alena`,
  "user-email": `alena1@gmail.com`,
  "user-password": `123`,
  "user-password-again": `321`
};

const route = new Router();
const dataService = new DataService(offersData, categoriesData, usersData);
category(route, dataService);
offer(route, dataService);
comment(route, dataService);
search(route, dataService);
user(route, dataService);
const app = express();
app.use(express.json());
app.use(`/api`, route);

module.exports = {
  app,
  offersData,
  postOfferData,
  postOfferFalseData,
  postCommentData,
  postCommentFalseData,
  usersData,
  loginUserData,
  falseLoginUserData,
  postUserData,
  falsePostUserData
};
