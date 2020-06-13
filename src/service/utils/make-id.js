'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../const`);

module.exports = () => nanoid(MAX_ID_LENGTH);
