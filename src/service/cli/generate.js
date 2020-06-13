'use strict';

const chalk = require(`chalk`);
const {InputData, Commands, DataPath, DataFiles} = require(`../const`);
const {getPath, readData, writeData} = require(`../utils/common`);
const generateOffers = require(`../utils/generate-offers`);

module.exports = {
  name: Commands.GENERATE,
  run: async (count) => {
    const offersCount = Number.parseInt(count, 10) || InputData.DEFAULT_COUNT;

    if (offersCount > InputData.MAX_COUNT) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(1);
    }

    const categoriesData = await readData(getPath(DataFiles.CATEGORIES));
    const sentencesData = await readData(getPath(DataFiles.SENTENCES));
    const titlesData = await readData(getPath(DataFiles.TITLES));
    const commentsData = await readData(getPath(DataFiles.COMMENTS));
    const offers = generateOffers({
      categories: categoriesData,
      sentences: sentencesData,
      titles: titlesData,
      comments: commentsData,
      count: offersCount
    });
    await writeData(DataPath.OUT, JSON.stringify(offers));
  }
};
