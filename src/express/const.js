'use strict';

const MAX_ID_LENGTH = 6;
const POPULAR_OFFERS_COUNT = 8;
const NEW_OFFERS_COUNT = 8;
const COMMENTS_PAGE_COUNT = 3;
const BASE_URL = `http://localhost:3000/api`;
const DEFAULT_OFFER_PICTURE = `img/blank.png`;
const DEFAULT_OFFER = {
  id: `-1`,
  category: [],
  description: ``,
  title: ``,
  type: ``,
  sum: ``,
  picture: DEFAULT_OFFER_PICTURE,
  pictureSrcset: DEFAULT_OFFER_PICTURE.replace(`/\./`, `@2x.`)
};

module.exports = {
  MAX_ID_LENGTH,
  POPULAR_OFFERS_COUNT,
  NEW_OFFERS_COUNT,
  COMMENTS_PAGE_COUNT,
  BASE_URL,
  DEFAULT_OFFER
};
