const calculFrame = require('../src/client/score');
const calculScoreTotal = require('../src/client/score');
const calcFrame10 = require('../src/client/score');
const Gird= require("../src/client/gird");
const Frame= require("../src/client/frame");

const assert = require('assert');
const { getEnvironmentData } = require('worker_threads');



describe('calculFrame', function(){
  it('Calcul the score of a frame',function(){
    var g = new Grid();
    g.players["player1"] = [
        new Frame(1,2),
        new Frame(10,0), 
        new Frame(8,2),
        new Frame(5,3),
        new Frame(10,0),
        new Frame(10,0),
        new Frame(10,0), 
        new Frame(2,8),
        new Frame(10,0), 
        new Frame(10,5,3)
    ];
    assert.equal(calculFrame(g.players['player1'],1),3); // No strike, no spare
    assert.equal(calculFrame(g.players['palyer1'],2),20); //1 strike in a row
    assert.equal(calculFrame(g.players['player1'],3),15); //spare
    assert.equal(calculFrame(g.players['player1'],5),30); // 3 strikes in a row
    assert.equal(calculFrame(g.players["player1"],6),22); //2 strikes in a row
    assert.equal(calculFrame(g.players['player1'],9),25);// strike at the 9th frame with 2 strikes in a row
    assert.equal(calculFrame(g.players['player1'],10),18) // case of the 10th frame
  }

  );
 }
 
 );

 describe('calculScoreTotal', function(){
  it('Calcul the final score and the score accumulated of all the frames',function(){
    var g = new grid();
    g.players["player1"] = [
        new Frame(1,2),
        new Frame(10,0), 
        new Frame(8,2),
        new Frame(0,0),
        new Frame(10,0),
        new Frame(10,0),
        new Frame(10,0), 
        new Frame(2,8),
        new Frame(10,0), 
        new Frame(10,5,3)
    ];
    assert.equal(calculScoreTotal(g.players["player1"]),168);
    var t=[3,23,33,33,63,85,105,125,150,168];
    for(let i=0;i<10;i=i+1){
      assert.equal(g.players["player1"][i].getTotalScore(),t[i]);
    }
  }

  );
 }
 );

describe('calcFrame10', function() {
  it('should return the correct result of frame 10', function() {
    assert.equal(calcFrame10(new Frame(10, 10,10)), 30); // maximum score with a third throw  (3 strikes)
    assert.equal(calcFrame10(new Frame(10, 5,5)), 20); // strike on the first throw
    assert.equal(calcFrame10(new Frame(4, 4,0)), 8); // score without third throw
    assert.equal(calcFrame10(new Frame(8, 2,7)), 17); // score with third throw (spare)
    assert.equal(calcFrame10(new Frame(0, 0,0)), 0); // score with 0 point (0 fallen keel)
    assert.equal(calcFrame10(new Frame(0, 5,0)), 5); // second throw score
    assert.equal(calcFrame10(new Frame(0, 10,4)), 14); // score with spare on the second throw  
    assert.equal(calcFrame10(new Frame(10, 10,4)), 24); // score with 2 strikes (2 first throw)
    assert.equal(calcFrame10(new Frame(0, 10,10)), 20); // score with 2 strikes  (2 last throw)
  });
});