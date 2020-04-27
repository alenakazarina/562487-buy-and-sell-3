'use strict';
const fs = require(`fs`).promises;
const {getPath} = require(`../utils/common`);
const {DataPath, DataFiles} = require(`../const`);
const {getLogger} = require(`../logger/logger`);
const logger = getLogger({name: `pino-helpers`});

const readOffers = async () => {
  try {
    const offersFileContent = await fs.readFile(DataPath.OUT);
    return offersFileContent.length ? JSON.parse(offersFileContent) : [];
  } catch (err) {
    logger.warn(`Read file error ${DataPath.OUT}`);
    return [];
  }
};

const readCategories = async () => {
  try {
    const categoriesFileContent = await fs.readFile(getPath(DataFiles.CATEGORIES), `utf-8`);
    return categoriesFileContent.length ? categoriesFileContent.split(`\n`).filter((item) => item !== ``) : [];
  } catch (err) {
    logger.warn(`Read file error ${getPath(DataFiles.CATEGORIES)}`);
    return [];
  }
};

module.exports = {
  readOffers,
  readCategories
};
