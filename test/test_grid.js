const add = require('../src/client/grid');
const assert = require('assert');

describe('add', function() {
  it('should return the correct result', function() {
    assert.equal(add(2, 3), 5);
    assert.equal(add(5, 7), 12);
  });
});
