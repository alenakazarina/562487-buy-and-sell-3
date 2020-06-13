'use strict';

const shuffle = (items) => {
  let shuffledArray = items.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }
  return shuffledArray;
};

const getRandomInteger = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};

const getRandomItem = (items) => {
  return shuffle(items)[getRandomInteger(0, items.length - 1)];
};

const getRandomItems = (items) => {
  return shuffle(items).slice(0, [getRandomInteger(1, items.length - 1)]);
};

const getRandomText = (items, maxCount) => {
  return shuffle(items).slice(0, getRandomInteger(1, maxCount)).join(` `);
};

const getPictures = () => Array.from({length: 16}, (it, i) => `img/item${i + 1}.jpg`);

const getRandomDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - getRandomInteger(0, 14));
  date.setHours(date.getHours() - getRandomInteger(0, 11));
  date.setMinutes(date.getMinutes() - getRandomInteger(0, 30));
  return date;
};

module.exports = {
  getRandomInteger,
  getPictures,
  getRandomItem,
  getRandomItems,
  getRandomText,
  getRandomDate
};
