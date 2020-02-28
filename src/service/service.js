'use strict';
const {Cli} = require(`./cli`);
const {DEFAULT_COMMAND, ExitCode} = require(`./const`);

const [, , ...args] = process.argv;
const [userCommand, count] = args;

if (userCommand === `undefined` || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[userCommand].run(count);
