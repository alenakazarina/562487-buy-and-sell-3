'use strict';

const generateCategories = require(`./generate-categories`);
const {readData} = require(`./common`);
const {DataPath, DataFiles} = require(`../const`);

let categories = null;

const getCategoriesData = async () => {
  if (categories !== null) {
    return Promise.resolve(categories);
  }

  try {
    const categoriesData = await readData(`${DataPath.IN}${DataFiles.CATEGORIES}`);
    categories = generateCategories(categoriesData);
  } catch (err) {
    return Promise.reject(err);
  }

  return Promise.resolve(categories);
};

module.exports = getCategoriesData;
