const calcFrame10 = require('../src/client/calcFrame10');
const assert = require('assert');

describe('calcFrame10', function() {
  it('should return the correct result of frame 10', function() {
    assert.equal(calcFrame10(new Frame(10, 10,10)), 30); // maximum score with a thord throw  (3 strikes)
    assert.equal(calcFrame10(new Frame(10, 5,5)), 20); // strike on the first throw
    assert.equal(calcFrame10(new Frame(4, 4,0)), 8); // score without third throw
    assert.equal(calcFrame10(new Frame(8, 2,7)), 17); // score with thord throw (spare)
    assert.equal(calcFrame10(new Frame(0, 0,0)), 0); // score with 0 point (0 fallen keel)
    assert.equal(calcFrame10(new Frame(0, 5,0)), 5); // second  throw score
    assert.equal(calcFrame10(new Frame(0, 10,4)), 14); // score with wpare on the second throw  
    assert.equal(calcFrame10(new Frame(10, 10,4)), 24); // score with 2 strikes (at first)
    assert.equal(calcFrame10(new Frame(0, 10,10)), 20); // score with 2 strike  (at last)
  });
});
