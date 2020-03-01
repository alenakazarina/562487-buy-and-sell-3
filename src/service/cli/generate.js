'use strict';
const fs = require(`fs`);
const chalk = require(`chalk`);
const util = require(`util`);

const {getRandomInteger, shuffle} = require(`../utils/utils`);
const {ExitCode} = require(`../const`);
const {
  TITLES,
  PICTURES,
  DESCRIPTIONS,
  DESCRIPTIONS_MAX_COUNT,
  OfferType,
  PriceLimit,
  Category
} = require(`../mock/mock`);

const DEFAULT_COUNT = 1;
const MAX_INPUT_COUNT = 1000;

const generateOffers = (count) => {
  const categories = Object.values(Category);
  return Array.from({length: count}, () => ({
    "type": Object.values(OfferType)[getRandomInteger(0, 1)],
    "title": shuffle(TITLES)[getRandomInteger(0, TITLES.length - 1)],
    "description": shuffle(DESCRIPTIONS).slice(0, getRandomInteger(1, DESCRIPTIONS_MAX_COUNT)).join(` `),
    "sum": getRandomInteger(PriceLimit.MIN, PriceLimit.MAX),
    "picture": shuffle(PICTURES)[getRandomInteger(0, PICTURES.length - 1)],
    "category": shuffle(categories).slice(0, [getRandomInteger(1, categories.length - 1)])
  }));
};

const createMockFile = async (path, content) => {
  const writeFile = util.promisify(fs.writeFile);

  try {
    await writeFile(path, content);
    console.info(chalk.green(`Operation success. File created: ${path}`));
  } catch (error) {
    console.error(chalk.red(`Can't write data to file...`));
    process.exit(ExitCode.ERROR);
  }
};

module.exports = {
  name: `--generate`,
  run: (count) => {
    const offersCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (count > MAX_INPUT_COUNT) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.ERROR);
    }

    const mockFilePath = `./mocks.json`;
    const content = JSON.stringify(generateOffers(offersCount));
    createMockFile(mockFilePath, content);
  }
};

