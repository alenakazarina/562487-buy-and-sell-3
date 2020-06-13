'use strict';

const sharp = require(`sharp`);

const UPLOAD_DIR = `src/express/public/upload/`;

module.exports = async ({picture, width, height}) => {
  const imageInput = `${UPLOAD_DIR}${picture}`;
  const imageOutPut = imageInput.replace(/\./, `@2x.`);
  await sharp(imageInput)
    .resize(width, height)
    .toFile(imageOutPut);
  await sharp(imageOutPut)
    .resize(width / 2, height / 2)
    .toFile(imageInput);
};
