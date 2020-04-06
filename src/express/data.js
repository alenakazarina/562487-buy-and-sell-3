'use strict';
const cardsOffers = [{
  id: `06`,
  type: `sale`,
  title: `Ableton`,
  description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними`,
  sum: `88 000`,
  picture: `/img/item6.jpg`,
  pictureSrcset: `/img/item6@2x.jpg 2x`,
  category: `Электроника`
}, {
  id: `08`,
  type: `buy`,
  title: `Фотик Canon`,
  description: `Куплю вот такую итальянскую кофеварку, можно любой фирмы`,
  sum: `32 000`,
  picture: `/img/item8.jpg`,
  pictureSrcset: `/img/item8@2x.jpg 2x`,
  category: `Электроника`
}, {
  id: `15`,
  type: `sale`,
  title: `Кофемашина`,
  description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними`,
  sum: `26 000`,
  picture: `/img/item15.jpg`,
  pictureSrcset: `/img/item15@2x.jpg 2x`,
  category: `Электроника`
}, {
  id: `12`,
  type: `buy`,
  title: `Радио Панасоник`,
  description: `Куплю вот такую итальянскую кофеварку, можно любой фирмы`,
  sum: `32 000`,
  picture: `/img/item12.jpg`,
  pictureSrcset: `/img/item12@2x.jpg 2x`,
  category: `Электроника`
}, {
  id: `13`,
  type: `sell`,
  title: `Штатив Sony`,
  description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними`,
  sum: `8 000`,
  picture: `/img/item13.jpg`,
  pictureSrcset: `/img/item13@2x.jpg 2x`,
  category: `Электроника`
}, {
  id: `14`,
  type: `buy`,
  title: `Дрон с камерой`,
  description: ` Куплю вот такую итальянскую кофеварку, можно любой фирмы`,
  sum: `32 000`,
  picture: `/img/item14.jpg`,
  pictureSrcset: `/img/item14@2x.jpg 2x`,
  category: `Электроника`
}];

const commentsOffers = [
  {
    title: `Ленд Ровер`,
    price: `900 000`,
    type: `sell`,
    comments: [{
      user: `Александр Бурый`,
      text: `А что с прогоном автомобиля? Также вижу на фото зимнюю резину. А летняя идет ли впридачу?`,
      avatarUrl: `img/avatar03.jpg`,
      avatarSrcset: `img/avatar03@2x.jpg 2x`
    }, {
      user: `Анатолий Хакимов`,
      text: `Хочу прийти посмотреть на авто в среду. Мой телефон 89254455566. Готовы принять?`,
      avatarUrl: `img/avatar04.jpg`,
      avatarSrcset: `img/avatar04@2x.jpg 2x`
    }, {
      user: `Георгий Шпиц`,
      text: `Что это за рухлядь? Стыдно такое даже фотографировать, не то, что продавать.`,
      avatarUrl: `img/avatar02.jpg`,
      avatarSrcset: `img/avatar02@2x.jpg 2x`
    }]
  }, {
    title: `Ableton`,
    price: `900 000`,
    type: `sell`,
    comments: [{
      user: `Александр Бурый`,
      text: `А что с прогоном автомобиля? Также вижу на фото зимнюю резину. А летняя идет ли впридачу?`,
      avatarUrl: `img/avatar03.jpg`,
      avatarSrcset: `img/avatar03@2x.jpg 2x`
    }, {
      user: `Анатолий Хакимов`,
      text: `Хочу прийти посмотреть на авто в среду. Мой телефон 89254455566. Готовы принять?`,
      avatarUrl: `img/avatar04.jpg`,
      avatarSrcset: `img/avatar04@2x.jpg 2x`
    }, {
      user: `Георгий Шпиц`,
      text: `Что это за рухлядь? Стыдно такое даже фотографировать, не то, что продавать.`,
      avatarUrl: `img/avatar02.jpg`,
      avatarSrcset: `img/avatar02@2x.jpg 2x`
    }]
  }];


const offersCategories = [{
  title: `Дом`,
  count: 81,
  picture: ,
  srcset:
}, {
  title: `Электроника`,
  count: 62,
  picture: ,
  srcset:
}, {
  title: `Одежда`,
  count: 106,
  picture: ,
  srcset:
}, {
  title: `Спорт/отдых`,
  count: 86,
  picture: ,
  srcset:
}, {
  title: `Авто`,
  count: 34,
  picture: ,
  srcset:
}, {
  title: `Книги`,
  count: 92,
  picture: ,
  srcset:
}];

module.exports = {
  cardsOffers,
  commentsOffers,
  offersCategories
};
