'use strict';
const {readdir} = require(`fs`).promises;
const chalk = require(`chalk`);
const {DEFAULT_COUNT, MAX_INPUT_COUNT} = require(`../const`);
const {getRandomInteger, shuffle, readData, writeData} = require(`../utils/utils`);
const {PICTURES, DESCRIPTIONS_MAX_COUNT, OfferType, PriceLimit} = require(`../mock/mock`);

const DATA_PATH = {
  IN: `./data/`,
  OUT: `./mocks.json`,
};

const getPath = (filePath) => {
  return `${DATA_PATH.IN}${filePath}`;
};

const generateOffers = async (count) => {
  const files = await readdir(DATA_PATH.IN);
  const [categories, sentences, titles] = await Promise.all(
      files.map((file) => readData(getPath(file)))
  );

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
  name: `--generate`,
  run: async (count) => {
    const offersCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (count > MAX_INPUT_COUNT) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(1);
    }

    const offers = await generateOffers(offersCount);
    const content = JSON.stringify(offers);
    await writeData(DATA_PATH.OUT, content);
  }
};
