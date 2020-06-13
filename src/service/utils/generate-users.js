'use strict';

const User = require(`../models/user`);

module.exports = () => {
  const users = [
    {
      name: `Денис Шкатулкин`,
      email: `shkatulkin@ya.ru`,
      avatar: `/img/avatar01.jpg`,
      avatarSrcset: `/img/avatar01@2x.jpg`,
      password: `123`
    },
    {
      name: `Александр Бурый`,
      email: `alex@gmail.com`,
      avatar: `/img/avatar02.jpg`,
      avatarSrcset: `/img/avatar02@2x.jpg`,
      password: `123`
    },
    {
      name: `Анатолий Хакимов`,
      email: `hack@gmail.com`,
      avatar: `/img/avatar03.jpg`,
      avatarSrcset: `/img/avatar03@2x.jpg`,
      password: `123`
    },
    {
      name: `Георгий Шпиц`,
      email: `shpiz@gmail.com`,
      avatar: `/img/avatar04.jpg`,
      avatarSrcset: `/img/avatar04@2x.jpg`,
      password: `123`
    }];
  return users.map((user) => new User(user));
};
