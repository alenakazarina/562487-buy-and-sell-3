'use strict';

const offers = [
  {
    id: `1`,
    type: `offer`,
    title: `Куплю самогонный аппарат авторской сборки.`,
    description: `Поделись в соцсетях и получи бонусом стикеры 🎁.`,
    sum: 1620,
    picture: `item10.jpg`,
    category: [`Мебель`, `Разное`],
    comments: [
      {
        id: `1`,
        text: `У меня есть то, что Вам нужно!`
      },
      {
        id: `2`,
        text: `Совсем немного...`
      }
    ]
  },
  {
    id: `2`,
    type: `sell`,
    title: `Продам коллекцию журналов «Огонёк»`,
    description: `Продаю с болью в сердце 💔... Немного заляпано свежим кофе ☕️.`,
    sum: 500,
    picture: `item11.jpg`,
    category: [`Книги`, `Разное`],
    comments: [
      {
        id: `1`,
        text: `Вы что?! В магазине дешевле.`
      },
      {
        id: `2`,
        text: `Почему в таком ужасном состоянии?`
      }
    ]
  }
];

const categories = [
  `Книги`,
  `Журналы`,
  `Разное`,
  `Посуда`,
  `Мебель`,
  `Игры`,
  `Животные`,
  `Растения`,
  `Мебель`,
  `Электроника`,
  `Фототехника`,
  `Одежда`
];

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
  offers,
  categories,
  offerData,
  updateData,
  commentData,
  offerFalseData,
  updateFalseData,
  commentFalseData
};
