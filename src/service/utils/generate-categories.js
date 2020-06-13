'use strict';

module.exports = (categories) => categories.map((category, i) => ({
  id: `${i + 1}`,
  title: category,
  picture: `/img/cat${i + 1}.jpg`,
  pictureSrcset: `/img/cat${i + 1}@2x.jpg`,
  count: 0
}));
