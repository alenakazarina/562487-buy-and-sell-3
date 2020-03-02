'use strict';

const PICTURES = Array.from({length: 16}, (it, i) => `item${i < 9 ? `0${i + 1}` : `${i + 1}`}.jpg`);

const DESCRIPTIONS_MAX_COUNT = 5;

const OfferType = {
  OFFER: `offer`,
  Sale: `sale`
};

const PriceLimit = {
  MIN: 1000,
  MAX: 10000
};

module.exports = {
  PICTURES,
  DESCRIPTIONS_MAX_COUNT,
  OfferType,
  PriceLimit
};
