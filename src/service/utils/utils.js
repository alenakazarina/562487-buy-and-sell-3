'use strict';
const {writeFile, readFile} = require(`fs`).promises;
const chalk = require(`chalk`);

const shuffle = (items) => {
  let shuffledArray = items.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }
  return shuffledArray;
};

const getRandomInteger = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};

const readData = async (filePath) => {
  return readFile(filePath, `utf-8`)
    .then((data) => data.split(`\n`).filter((item) => item !== ``))
    .catch(() => {
      console.error(chalk.red(`Can't read data from file ${filePath}`));
      process.exit(1);
    });
};

const writeData = async (path, content) => {
  return writeFile(path, content)
    .then(() => console.info(chalk.green(`Operation success. File created: ${path}`)))
    .catch(() => {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(1);
    });
};

module.exports = {
  shuffle,
  getRandomInteger,
  readData,
  writeData
};
