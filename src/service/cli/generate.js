'use strict';
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {InputData, OffersData, Commands, DataPath, DataFiles} = require(`../const`);
const {getRandomInteger, getRandomItem, getRandomItems, getPictures, getRandomText} = require(`../utils/generate`);
const {getPath, readData, writeData} = require(`../utils/common`);

const generateComments = (comments) => {
  const commentsCount = getRandomInteger(0, 5);
  return Array.from({length: commentsCount}, () => ({
    id: nanoid(6),
    text: getRandomText(comments, getRandomInteger(1, (comments.length - 1) / 2))
  }));
};

const generateOffers = (categories, sentences, titles, comments, count) => {
  const pictures = getPictures();
  return Array.from({length: count}, () => ({
    id: nanoid(6),
    type: getRandomItem(Object.values(OffersData.TYPE)),
    title: getRandomItem(titles),
    description: getRandomText(sentences, OffersData.MAX_TEXT_LENGHT),
    sum: getRandomInteger(OffersData.PRICE_LIMIT.MIN, OffersData.PRICE_LIMIT.MAX),
    picture: getRandomItem(pictures),
    category: getRandomItems(categories),
    comments: generateComments(comments)
  }));
};

module.exports = {
  name: Commands.GENERATE,
  run: async (count) => {
    const offersCount = Number.parseInt(count, 10) || InputData.DEFAULT_COUNT;

    if (count > InputData.MAX_COUNT) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(1);
    }

    const categories = await readData(getPath(DataFiles.CATEGORIES));
    const sentences = await readData(getPath(DataFiles.SENTENCES));
    const titles = await readData(getPath(DataFiles.TITLES));
    const comments = await readData(getPath(DataFiles.COMMENTS));

    const content = JSON.stringify(generateOffers(categories, sentences, titles, comments, offersCount));

    await writeData(DataPath.OUT, content);
  }
};
