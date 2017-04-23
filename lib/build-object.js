'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

class BuildObject {
  constructor(data) {
    // Read in the images we want to use. This determines the number of files
    // we are going to build. We need at least one Dockerfile & *.sh per image.
    if (data.image && !Array.isArray(data.image)) data.image = [data.image];
    this.image = data.image;

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

  parseScript(script) {
    // return new Promise((resolve, reject) => {
    //   if (typeof script == 'string') {
    //     if (path.extname(script) != '') {
    //       // Then it is a path.
    //       fs.access(script, fs.constants.X_OK, (err) => {
    //         if (err) {
    //           reject(new Error(`${script} is not executable. Try changing permissions using 'sudo chmod +x <file>'`));
    //         } else {
    //           resolve(script);
    //         }
    //       });
    //     }
    //
    //   } else {
    //     resolve(script);
    //   }
    // });
    return script;
  }

  // before_install
  set before_install(script) {
    this._before_install = this.parseScript(script);
  }

  get before_install() {
    return this._before_install;
  }

  // install
  set install(script) {
    this._install = this.parseScript(script);
  }

  get install() {
    return this._install;
  }

  // before_script
  set before_script(script) {
    this._before_script = this.parseScript(script);
  }

  get before_script() {
    return this._before_script;
  }

  // script
  set script(script) {
    this._script = this.parseScript(script);
  }

  get script() {
    return this._script;
  }

  // after_script
  set after_script(script) {
    this._after_script = this.parseScript(script);
  }

  get after_script() {
    return this._after_script;
  }
};

module.exports = BuildObject;
