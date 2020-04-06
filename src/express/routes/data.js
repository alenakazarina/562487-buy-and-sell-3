'use strict';
const cardsOffers = [{
  id: `06`,
  type: `sale`,
  title: `Ableton`,
  description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними`,
  sum: `88 000`,
  picture: `/img/item6.jpg`,
  srcset: `/img/item6@2x.jpg 2x`,
  category: [`Электроника`]
}, {
  id: `08`,
  type: `offer`,
  title: `Фотик Canon`,
  description: `Куплю вот такую итальянскую кофеварку, можно любой фирмы`,
  sum: `32 000`,
  picture: `/img/item8.jpg`,
  srcset: `/img/item8@2x.jpg 2x`,
  category: [`Электроника`]
}, {
  id: `15`,
  type: `sale`,
  title: `Кофемашина`,
  description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними вечерами.`,
  sum: `26 000`,
  picture: `/img/item15.jpg`,
  srcset: `/img/item15@2x.jpg 2x`,
  category: [`Электроника`, `Дом`]
}, {
  id: `12`,
  type: `offer`,
  title: `Радио Панасоник`,
  description: `Куплю вот такую итальянскую кофеварку, можно любой фирмы`,
  sum: `32 000`,
  picture: `/img/item12.jpg`,
  srcset: `/img/item12@2x.jpg 2x`,
  category: [`Электроника`]
}, {
  id: `13`,
  type: `sale`,
  title: `Штатив Sony`,
  description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними вечерами.`,
  sum: `8 000`,
  picture: `/img/item13.jpg`,
  srcset: `/img/item13@2x.jpg 2x`,
  category: [`Электроника`]
}, {
  id: `14`,
  type: `offer`,
  title: `Дрон с камерой`,
  description: `Куплю вот такой дрон с камерой, можно другой фирмы`,
  sum: `32 000`,
  picture: `/img/item14.jpg`,
  srcset: `/img/item14@2x.jpg 2x`,
  category: [`Электроника`, `Спорт/отдых`]
}, {
  id: `1`,
  type: `sale`,
  title: `Монстера`,
  description: `Куплю монстеру зеленую в хорошем зеленом состоянии, буду поливать`,
  sum: `1 000`,
  picture: `/img/item1.jpg`,
  srcset: `/img/item1@2x.jpg 2x`,
  category: [`Дом`]
}, {
  id: `3`,
  type: `sale`,
  title: `Дедушкины часы`,
  description: `Продаю дедушкины часы в прекрасном состоянии, ходят до...`,
  sum: `45 000`,
  picture: `/img/item3.jpg`,
  srcset: `/img/item3@2x.jpg 2x`,
  category: [`Дом`]
}];

const offerComments = [{
  user: `Александр Бурый`,
  text: `А что с прогоном автомобиля? Также вижу на фото зимнюю резину. А летняя идет ли впридачу?`,
  avatarUrl: `/img/avatar03.jpg`,
  avatarSrcset: `/img/avatar03@2x.jpg 2x`
}, {
  user: `Анатолий Хакимов`,
  text: `Хочу прийти посмотреть на авто в среду. Мой телефон 89254455566. Готовы принять?`,
  avatarUrl: `/img/avatar04.jpg`,
  avatarSrcset: `/img/avatar04@2x.jpg 2x`
}, {
  user: `Георгий Шпиц`,
  text: `Что это за рухлядь? Стыдно такое даже фотографировать, не то, что продавать.`,
  avatarUrl: `/img/avatar02.jpg`,
  avatarSrcset: `/img/avatar02@2x.jpg 2x`
}];

const offersCategories = [{
  title: `Дом`,
  count: 81,
  picture: `/img/cat1.jpg`,
  srcset: `/img/cat1@2x.jpg 2x`
}, {
  title: `Электроника`,
  count: 62,
  picture: `/img/cat2.jpg`,
  srcset: `/img/cat2@2x.jpg 2x`
}, {
  title: `Одежда`,
  count: 106,
  picture: `/img/cat3.jpg`,
  srcset: `/img/cat3@2x.jpg 2x`
}, {
  title: `Спорт/отдых`,
  count: 86,
  picture: `/img/cat4.jpg`,
  srcset: `/img/cat4@2x.jpg 2x`
}, {
  title: `Авто`,
  count: 34,
  picture: `/img/cat5.jpg`,
  srcset: `/img/cat5@2x.jpg 2x`
}, {
  title: `Книги`,
  count: 92,
  picture: `/img/cat6.jpg`,
  srcset: `/img/cat6@2x.jpg 2x`
}];

const PageContent = {
  title: `Куплю Продам`,
  description: `Доска объявлений — современный веб-сайт, упрощающий продажу или покупку абсолютно любых вещей.`,
  isAuth: true
};

module.exports = {
  cardsOffers,
  offerComments,
  offersCategories,
  PageContent
};
