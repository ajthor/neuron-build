'use strict';

const path = require('path');
const BuildObject = require('./build-object');

class DockerfileObject extends BuildObject {
  constructor(data) {
    super(data);
    console.log(`[convert] Dockerfile...`);

    this.separator = '\n';
  }

  generate() {
    for (let img of this.image) {
      const lines = [];
      let cmdType, retLines, shallow, end;

      lines.push(`FROM ${img}`);
      lines.push(this.separator);

      for (const script of this.scriptNames) {
        if (Array.isArray(this[`${script}`])) {
          cmdType = 'generateCmd';
        } else {
          cmdType = 'generateScript';
        }

        retLines = this[`${cmdType}`](this[`${script}`]);

        for (const line of retLines) {
          lines.push(line);
        }

        if (retLines.length) {
          lines.push(this.separator);
        }
      }

      for (let l of lines) {
        console.log(l);
      }
      return lines;
    }
  }

  generateCmd(item) {
    if (!item) return [];

    const lines = [];
    let end;
    let shallowCopy = item.slice();

    if (shallowCopy.length > 1) {
      lines.push(`RUN ${shallowCopy.splice(0,1)} \\`);
      end = shallowCopy.splice(-1,1);

      if (shallowCopy.length) {
        for (const cmd of shallowCopy) {
          lines.push(` && ${cmd} \\`);
        }
      }

      lines.push(` && ${end}`);
    } else {
      lines.push(`RUN ${shallowCopy}`);
    }

    return lines;
  }

  generateScript(item) {
    if (!item) return [];

    const lines = [];

    lines.push(`COPY ${path.resolve(__dirname, item)} \/${path.parse(item).base}`);
    lines.push(`RUN \/${path.parse(item).base}`);

    return lines;
  }
};

module.exports = DockerfileObject;
