'use strict';

const axios = require(`axios`);
const {BASE_URL} = require(`./const`);

const dataService = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 5,
  withCredentials: true
});

module.exports = dataService;
