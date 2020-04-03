'use strict';
const chalk = require(`chalk`);
const {DEFAULT_COUNT, MAX_INPUT_COUNT, Commands, DataPath, DataFiles} = require(`../const`);
const {getRandomInteger, shuffle, readData, writeData} = require(`../utils/utils`);
const {PICTURES, DESCRIPTIONS_MAX_COUNT, OfferType, PriceLimit} = require(`../mock/mock`);

const getPath = (filePath) => {
  return `${DataPath.IN}${filePath}`;
};

const generateOffers = (categories, sentences, titles, count) => {
  return Array.from({length: count}, () => ({
    "type": Object.values(OfferType)[getRandomInteger(0, 1)],
    "title": shuffle(titles)[getRandomInteger(0, titles.length - 1)],
    "description": shuffle(sentences).slice(0, getRandomInteger(1, DESCRIPTIONS_MAX_COUNT)).join(` `),
    "sum": getRandomInteger(PriceLimit.MIN, PriceLimit.MAX),
    "picture": shuffle(PICTURES)[getRandomInteger(0, PICTURES.length - 1)],
    "category": shuffle(categories).slice(0, [getRandomInteger(1, categories.length - 1)])
  }));
};

module.exports = {
  name: Commands.GENERATE,
  run: async (count) => {
    const offersCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (count > MAX_INPUT_COUNT) {
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
