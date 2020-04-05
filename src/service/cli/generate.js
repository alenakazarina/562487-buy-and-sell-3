'use strict';
const chalk = require(`chalk`);
const {InputData, OffersData, Commands, DataPath, DataFiles} = require(`../const`);
const {getRandomInteger, getRandomItem, getRandomItems, getPictures, getRandomText} = require(`../utils/generate`);
const {getPath, readData, writeData} = require(`../utils/common`);

const generateOffers = (categories, sentences, titles, count) => {
  const pictures = getPictures();
  return Array.from({length: count}, () => ({
    type: getRandomItem(Object.values(OffersData.TYPE)),
    title: getRandomItem(titles),
    description: getRandomText(sentences, OffersData.MAX_TEXT_LENGHT),
    sum: getRandomInteger(OffersData.PRICE_LIMIT.MIN, OffersData.PRICE_LIMIT.MAX),
    picture: getRandomItem(pictures),
    category: getRandomItems(categories)
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
    const content = JSON.stringify(generateOffers(categories, sentences, titles, offersCount));

    await writeData(DataPath.OUT, content);
  }
};
