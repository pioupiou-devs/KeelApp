const add = require('../src/client/grid');
const assert = require('assert');
const { getEnvironmentData } = require('worker_threads');

describe('add', function() {
  it('should return the correct result', function() {
    assert.equal(add(2, 3), 5);
    assert.equal(add(5, 7), 12);
  });
});


describe('calculFrame', function(){
  it('Calcul the score of a frame',function(){
    var g = new grid();
    g["player1"] = [
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
    assert.equal(calculFrame(g['player1'],1),3); // No strike, no spare
    assert.equal(calculFrame(g['palyer1'],2),20); //1 strike in a row
    assert.equal(calculFrame(g['player1'],3),15); //spare
    assert.equal(calculFrame(g['player1'],5),30); // 3 strikes in a row
    assert.equal(calculFrame(g["player1"],6),22); //2 strikes in a row
    assert.equal(calculFrame(g['player1'],9),25);// strike at the 9th frame with 2 strikes in a row
    assert.equal(calculFrame(g['player1'],10),18) // case of the 10th frame
  }

  );
 }
 
 );

 describe('calculScoreTotal', function(){
  it('Calcul the final score and the score accumulated of all the frames',function(){
    var g = new grid();
    g["player1"] = [
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
    assert.equal(calculScoreTotal(g["player1"]),168);
    var t=[3,23,33,33,63,85,105,125,150,168];
    for(let i=0;i<10;i=i+1){
      assert.equal(g["player1"][i]["scoreCum"],t[i]);
    }
  }

  );
 }
 
 );