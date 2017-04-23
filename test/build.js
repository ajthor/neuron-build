'use strict';

const test = require('tape');
const df = require('../lib/build');

test('Can parse yml', (t) => {
  const foo = df.convert('../examples/neuron.yml');
  foo.then((obj) => {
    console.log(obj);
    t.equal(obj.image[0], 'nodejs');
    t.end();
  });
});
