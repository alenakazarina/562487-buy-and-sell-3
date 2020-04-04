'use strict';
const chalk = require(`chalk`);
const {InputData, OffersData, Commands, DataPath, DataFiles} = require(`../const`);
const {getRandomInteger, shuffle, getPictures} = require(`../utils/generate`);
const {getPath, readData, writeData} = require(`../utils/common`);

const generateOffers = (categories, sentences, titles, count) => {
  const pictures = getPictures();
  return Array.from({length: count}, () => ({
    type: Object.values(OffersData.type)[getRandomInteger(0, 1)],
    title: shuffle(titles)[getRandomInteger(0, titles.length - 1)],
    description: shuffle(sentences).slice(0, getRandomInteger(1, OffersData.maxTextLength)).join(` `),
    sum: getRandomInteger(OffersData.priceLimit.min, OffersData.priceLimit.max),
    picture: shuffle(pictures)[getRandomInteger(0, pictures.length - 1)],
    category: shuffle(categories).slice(0, [getRandomInteger(1, categories.length - 1)])
  }));
};

module.exports = {
  name: Commands.GENERATE,
  run: async (count) => {
    const offersCount = Number.parseInt(count, 10) || InputData.defaultCount;

    if (count > InputData.maxCount) {
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
