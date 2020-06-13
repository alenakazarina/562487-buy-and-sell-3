'use strict';

const {readFile} = require(`fs`).promises;
const {DataPath} = require(`../const`);

let data = null;

const getOffersData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const offersFileContent = await readFile(DataPath.OUT);
    data = JSON.parse(offersFileContent);
  } catch (err) {
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

module.exports = getOffersData;
