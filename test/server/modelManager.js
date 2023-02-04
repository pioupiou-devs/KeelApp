const assert = require('assert');
const Grid = require('../../src/server/models/grid');
const Frame = require('../../src/server/models/frame');
const Player = require('../../src/server/models/player');
const {createGrid,updateGrid,getGrid,grid}=require("../../src/server/modelManager");


const { create } = require('domain');



describe('Model Manager', function () {
    describe('createGrid', function () {
        describe('should create the grid', function () {
            it('should not be undefined', function () {
                var json='{"nbKeel" : 8,"nbFrames" : 10,"players": ["player1","player2","player3"]}';
                createGrid(JSON.parse(json));
                const {grid}=require("../../src/server/modelManager");
                assert.notEqual(grid, undefined);
            });
            it('should create the grid', function () {
                var json='{"nbKeel" : 8,"nbFrames" : 10,"players": ["player1","player2","player3"]}';
                //var grid;
                createGrid(JSON.parse(json));
                const {grid}=require("../../src/server/modelManager");
                assert.equal(grid instanceof Grid, true);
            });
            it('grid should have 8 keels', function () {
                var json='{"nbKeel" : 8,"nbFrames" : 10,"players": ["player1","player2","player3"]}';
                //var grid;
                createGrid(JSON.parse(json));
                const {grid}=require("../../src/server/modelManager");
                assert.equal(grid.nbKeel, 8);
            });
            it('grid should have 10 frame', function () {
                var json='{"nbKeel" : 8,"nbFrames" : 10,"players": ["player1","player2","player3"]}';
                //var grid;
                createGrid(JSON.parse(json));
                const {grid}=require("../../src/server/modelManager");
                assert.equal(grid.nbFrame, 10);
            });
            describe('each player need to have 10 frame (de facto test player name)', function () {
                it('3 player created', function () {
                    var json='{"nbKeel" : 8,"nbFrames" : 10,"players": ["player1","player2","player3"]}';
                    //var grid;
                    createGrid(JSON.parse(json));
                    const {grid}=require("../../src/server/modelManager");
                    console.log(Object.keys(grid.players));
                    assert.equal(grid.players.size, 3);
                });
                it('player1 have 10 frame', function () {
                    var json='{"nbKeel" : 8,"nbFrames" : 10,"players": ["player1","player2","player3"]}';
                    //var grid;
                    createGrid(JSON.parse(json));
                    const {grid}=require("../../src/server/modelManager");
                    assert.equal(grid.players.get('player1').frames.length, 10);
                });
                it('player2 have 10 frame', function () {
                    var json='{"nbKeel" : 8,"nbFrames" : 10,"players": ["player1","player2","player3"]}';
                    //var grid;
                    createGrid(JSON.parse(json));
                    const {grid}=require("../../src/server/modelManager");
                    assert.equal(grid.players.get('player2').frames.length, 10);
                });
                it('player3 have 10 frame', function () {
                    var json='{"nbKeel" : 8,"nbFrames" : 10,"players": ["player1","player2","player3"]}';
                    //var grid;
                    createGrid(JSON.parse(json));
                    const {grid}=require("../../src/server/modelManager");
                    assert.equal(grid.players.get('player3').frames.length, 10);
                });
            });
        });
    });

    describe('updateGrid', function () {
        it('should create a new Player', function () {
            let player = new Player();
            assert.notEqual(player, null);
        });
    });
    describe('getGrid', function () {
        it('should create a new Player', function () {

            function replacer(key, value) {
                // Filtering out properties
                if (typeof value === "string") {
                  return undefined;
                }
                return value;
              }

            var json='{"nbKeel" : 10,"nbFrames" : 3,"players": ["player1","player2"]}';
            createGrid(JSON.parse(json));
            const {grid}=require("../../src/server/modelManager");
            json = `{"nbKeel":10,"nbFrame":3,"player":{"player1":{"frames":[{"c1":1,"c2":3,"c3":0,"score":4,"totalScore":4},{"c1":1,"c2":9,"c3":0,"score":20,"totalScore":24},{"c1":10,"c2":10,"c3":5,"score":25,"totalScore":49}],"isPlaying":false,"currentFrame":4,"nbThrow": 1},"player2":{"frames":[{"c1":1,"c2":3,"c3":0,"score":4,"totalScore":4},{"c1":1,"c2":9,"c3":0,"score":19,"totalScore":23},{"c1":9,"c2":0,"c3":0,"score":9,"totalScore":32}],"isPlaying":true,"currentFrame":3,"nbThrow": 2}}}`;
            assert.equal(createGrid(),);

        });
    });
});
