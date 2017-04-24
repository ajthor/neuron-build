'use strict';

const fs = require('fs');
const path = require('path');

class BuildObject {
  constructor(data, options) {
    // Define defaults.
    const defaults = {
      separator: '\n'
    };
    this.options = Object.assign({}, defaults, options);

    // Read in the images we want to use. This determines the number of files
    // we are going to build. We need at least one Dockerfile & *.sh per image.
    if (data.image && !Array.isArray(data.image)) data.image = [data.image];
    this.image = data.image;

    // Get the environment variables we need to set in our containers.
    if (data.env && !Array.isArray(data.env)) data.env = [data.env];
    this.env = data.env;

    // Read script files. Each of these needs to pass through a function to
    // detect what type of parameter is being passed.
    this.scriptNames = [
      'before_install',
      'install',
      'before_script',
      'script',
      'after_script'
    ];

    for (const script of this.scriptNames) {
      this[`${script}`] = data[`${script}`] || false;
    }
  }

};

module.exports = BuildObject;
