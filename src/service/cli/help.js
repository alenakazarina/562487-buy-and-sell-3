'use strict';
const chalk = require(`chalk`);
const {Commands} = require(`../const`);

module.exports = {
  name: Commands.HELP,
  run: () => {
    console.info(
        chalk.gray(`
          Программа запускает http-сервер и формирует файл с данными для API.

          Гайд:
          server <command>

          Команды:
          --version              выводит номер версии
          --help                 печатает этот текст
          --generate <count>     формирует файл mocks.json
        `)
    );
  }
};
