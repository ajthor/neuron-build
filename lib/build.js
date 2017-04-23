'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const yaml = require('js-yaml');

const DockerfileObject = require('./build-dockerfile');

module.exports.convert = (filePath) => {
  const file = path.resolve(__dirname, filePath);

  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }

      try {
        const parsedData = yaml.safeLoad(data);
        resolve(parsedData);
      } catch (e) {
        reject(e);
      }
    })
  }).then((data) => {
    // Create DockerfileObject.
    const obj = new DockerfileObject(data);
    obj.generate();
    return obj;
  });
};
