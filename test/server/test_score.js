/*
const {calculFrame,calculScoreTotal,calcFrame10}=require("../src/client/score");

const Grid= require("../src/client/grid");
const Frame= require("../src/client/frame");

const assert = require('assert');
const { getEnvironmentData } = require('worker_threads');



describe('calculFrame', function(){
  it('Calcul the score of a frame with no spare and no strike',function(){
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
  });
  it('Calcul the score of a frame with one strike in a row',function(){
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
    assert.equal(calculFrame(g.players['player1'],7),20); //1 strike in a row
  });
  it('Calcul the score of a frame with spare',function(){
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
    assert.equal(calculFrame(g.players['player1'],3),15); //spare
  });
  it('Calcul the score of a frame with 3 strike in a row',function(){
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
    assert.equal(calculFrame(g.players['player1'],5),30); // 3 strikes in a row
});
it('Calcul the score of a frame with 2 strike in a row',function(){
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
    assert.equal(calculFrame(g.players['player1'],6),22); // 2 strikes in a row
  });
  it('Calcul the score of a frame with strike at the 9th frame',function(){
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
    assert.equal(calculFrame(g.players['player1'],9),25);// strike at the 9th frame with 2 strikes in a row

  });
  it('Calcul the score of the 10th frame',function(){
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
    assert.equal(calculFrame(g.players['player1'],10),18);// case of the 10th frame
  });
    
  }
  
  );

  describe('calculScoreTotal', function(){
    var t=[3,23,33,33,63,85,105,125,150,168];
    var g = new Grid();
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
    it('Calcul the final score and the score accumulated of all the frames',function(){
      assert.equal(calculScoreTotal(g.players["player1"]),168);
    }

    );

    for(let i=0;i<10;i=i+1){
      it("Check if the accumulated score of the frame "+(i+1)+" is correct",function(){
        assert.equal(g.players["player1"][i].getTotalScore(),t[i]);
      });
    
      
    }
 }
 );

describe('calcFrame10', function() {
  describe('Return the correct result of frame 10 (correct data)', function() {
    it('Maximum score with a third throw (3 strikes)', function () {
      assert.equal(calcFrame10(new Frame(10, 10,10)), 30);
    });
    it('Strike on the first throw', function () {
      assert.equal(calcFrame10(new Frame(10, 5,5)), 20);
    });
    it('Score without third throw', function () {
      assert.equal(calcFrame10(new Frame(4, 4,0)), 8);
    });
    it('Score with third throw (spare)', function () {
      assert.equal(calcFrame10(new Frame(8, 2,7)), 17);
    });
    it('Score with 0 point (0 fallen keel)', function () {
      assert.equal(calcFrame10(new Frame(0, 0,0)), 0);
    });
    it('Second throw score', function () {
      assert.equal(calcFrame10(new Frame(0, 5,0)), 5);
    });
    it('Score with spare on the second throw', function () {
      assert.equal(calcFrame10(new Frame(0, 10,4)), 14);
    });
    it('Score with 2 strikes (2 first throw)', function () {
      assert.equal(calcFrame10(new Frame(10, 10,4)), 24);
    });
    it('score with 2 strikes (2 last throw)', function () {
      assert.equal(calcFrame10(new Frame(0, 10,10)), 20);
    });
    it('Null on third value', function () {
      assert.equal(calcFrame10(new Frame(0, 10,null)), 10);
    });
  });

  describe('Return result of frame 10 (or 0) with illegal number', function() {
    it('Illegal third throw', function () {
      assert.equal(calcFrame10(new Frame(9, 0, 9)), 9);
    });
  });

  describe('Manage strange data', function() {
    it('Undefine frame', function () {
      assert.equal(calcFrame10(undefined), 0);
    });
    it('Null frame', function () {
      assert.equal(calcFrame10(null), 0);
    });
    it('Null frame value', function () {
      assert.equal(calcFrame10(new Frame(null, null, null)), 0);
    });
    it('Not a frame', function () {
      assert.equal(calcFrame10(""), 0);
    });
  });
});
*/