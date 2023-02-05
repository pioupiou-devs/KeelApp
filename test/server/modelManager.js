const assert = require('assert');
const Grid = require('../../src/server/models/grid');
const Frame = require('../../src/server/models/frame');
const Player = require('../../src/server/models/player');
const {createGrid,updateGrid,getGrid,grid,playingPlayerGestion}=require("../../src/server/modelManager");


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
        it('test on get grid', function () {

            var json='{"nbKeel" : 10,"nbFrames" : 3,"players": ["player1","player2"]}';
            createGrid(JSON.parse(json));
            json = `{"player":{"player1":{"frames":[{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null},{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null},{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null}],"isPlaying":true,"currentFrame":1,"nbThrow":1},"player2":{"frames":[{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null},{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null},{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null}],"isPlaying":false,"currentFrame":1,"nbThrow":1}},"nbKeel":10,"nbFrame":3}`;
            assert.equal(getGrid(),json);

        });
    });
    describe('updateGrid', function () {
        it('test simple', function () {

            var json='{"nbKeel" : 10,"nbFrames" : 3,"players": ["player1","player2"]}';
            createGrid(JSON.parse(json));
            updateGrid("player1", 1, 1, 4);
            
            json = `{"player":{"player1":{"frames":[{"c1":4,"c2":0,"c3":0,"score":4,"totalScore":4},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":4},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":4}],"isPlaying":true,"currentFrame":1,"nbThrow":2},"player2":{"frames":[{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null},{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null},{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null}],"isPlaying":false,"currentFrame":1,"nbThrow":1}},"nbKeel":10,"nbFrame":3}`;
            
            assert.equal(getGrid(),json);

        });
        it('test 2 throw, noraml frame', function () {

            var json='{"nbKeel" : 10,"nbFrames" : 3,"players": ["player1","player2"]}';
            createGrid(JSON.parse(json));
            updateGrid("player1", 1, 1, 4);
            updateGrid("player1", 1, 2, 4);
            
            json = `{"player":{"player1":{"frames":[{"c1":4,"c2":4,"c3":0,"score":8,"totalScore":8},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":8},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":8}],"isPlaying":false,"currentFrame":2,"nbThrow":1},"player2":{"frames":[{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null},{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null},{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null}],"isPlaying":true,"currentFrame":1,"nbThrow":1}},"nbKeel":10,"nbFrame":3}`;
            
            assert.equal(getGrid(),json);

        });
        it('test strike, noraml frame', function () {

            var json='{"nbKeel" : 10,"nbFrames" : 3,"players": ["player1","player2"]}';
            createGrid(JSON.parse(json));
            updateGrid("player1", 1, 1, 10);
            
            json = `{"player":{"player1":{"frames":[{"c1":10,"c2":0,"c3":0,"score":10,"totalScore":10},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":10},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":10}],"isPlaying":false,"currentFrame":2,"nbThrow":1},"player2":{"frames":[{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null},{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null},{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null}],"isPlaying":true,"currentFrame":1,"nbThrow":1}},"nbKeel":10,"nbFrame":3}`;
            
            assert.equal(getGrid(),json);

        });
        it('testback to first player', function () {

            var json='{"nbKeel" : 10,"nbFrames" : 3,"players": ["player1","player2"]}';
            createGrid(JSON.parse(json));
            updateGrid("player1", 1, 1, 4);
            updateGrid("player1", 1, 2, 4);

            updateGrid("player2", 1, 1, 0);
            updateGrid("player2", 1, 2, 0);
            
            json = `{"player":{"player1":{"frames":[{"c1":4,"c2":4,"c3":0,"score":8,"totalScore":8},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":8},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":8}],"isPlaying":true,"currentFrame":2,"nbThrow":1},"player2":{"frames":[{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":0},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":0},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":0}],"isPlaying":false,"currentFrame":2,"nbThrow":1}},"nbKeel":10,"nbFrame":3}`;
            
            assert.equal(getGrid(),json);

        });

        it('test last frame (spare)', function () {

            var json='{"nbKeel" : 10,"nbFrames" : 3,"players": ["player1","player2"]}';
            createGrid(JSON.parse(json));
            //frmae 1
            updateGrid("player1", 1, 1, 4);
            updateGrid("player1", 1, 2, 4);

            updateGrid("player2", 1, 1, 0);
            updateGrid("player2", 1, 2, 0);

            //frame 2
            updateGrid("player1", 2, 1, 0);
            updateGrid("player1", 2, 2, 0);

            updateGrid("player2", 2, 1, 0);
            updateGrid("player2", 2, 2, 0);

            //frame 3 (last)
            updateGrid("player1", 3, 1, 4);
            updateGrid("player1", 3, 2, 6);


            json = `{"player":{"player1":{"frames":[{"c1":4,"c2":4,"c3":0,"score":8,"totalScore":8},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":8},{"c1":4,"c2":6,"c3":0,"score":10,"totalScore":18}],"isPlaying":true,"currentFrame":3,"nbThrow":3},"player2":{"frames":[{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":0},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":0},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":0}],"isPlaying":false,"currentFrame":3,"nbThrow":1}},"nbKeel":10,"nbFrame":3}`;
            
            assert.equal(getGrid(),json);

        });

        it('test last frame (strike)', function () {

            var json='{"nbKeel" : 10,"nbFrames" : 3,"players": ["player1","player2"]}';
            createGrid(JSON.parse(json));
            //frmae 1
            updateGrid("player1", 1, 1, 4);
            updateGrid("player1", 1, 2, 4);

            updateGrid("player2", 1, 1, 0);
            updateGrid("player2", 1, 2, 0);

            //frame 2
            updateGrid("player1", 2, 1, 0);
            updateGrid("player1", 2, 2, 0);

            updateGrid("player2", 2, 1, 0);
            updateGrid("player2", 2, 2, 0);

            //frame 3 (last)
            updateGrid("player1", 3, 1, 10);
            updateGrid("player1", 3, 2, 6);


            json = `{"player":{"player1":{"frames":[{"c1":4,"c2":4,"c3":0,"score":8,"totalScore":8},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":8},{"c1":10,"c2":6,"c3":0,"score":16,"totalScore":24}],"isPlaying":true,"currentFrame":3,"nbThrow":3},"player2":{"frames":[{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":0},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":0},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":0}],"isPlaying":false,"currentFrame":3,"nbThrow":1}},"nbKeel":10,"nbFrame":3}`;
            
            assert.equal(getGrid(),json);

        });
        it('test last frame ( 2 strike)', function () {

            var json='{"nbKeel" : 10,"nbFrames" : 3,"players": ["player1","player2"]}';
            createGrid(JSON.parse(json));
            //frmae 1
            updateGrid("player1", 1, 1, 4);
            updateGrid("player1", 1, 2, 4);

            updateGrid("player2", 1, 1, 0);
            updateGrid("player2", 1, 2, 0);

            //frame 2
            updateGrid("player1", 2, 1, 0);
            updateGrid("player1", 2, 2, 0);

            updateGrid("player2", 2, 1, 0);
            updateGrid("player2", 2, 2, 0);

            //frame 3 (last)
            updateGrid("player1", 3, 1, 10);
            updateGrid("player1", 3, 2, 10);


            json = `{"player":{"player1":{"frames":[{"c1":4,"c2":4,"c3":0,"score":8,"totalScore":8},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":8},{"c1":10,"c2":10,"c3":0,"score":20,"totalScore":28}],"isPlaying":true,"currentFrame":3,"nbThrow":3},"player2":{"frames":[{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":0},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":0},{"c1":0,"c2":0,"c3":0,"score":0,"totalScore":0}],"isPlaying":false,"currentFrame":3,"nbThrow":1}},"nbKeel":10,"nbFrame":3}`;
            
            assert.equal(getGrid(),json);

        });

    });


    describe('playingPlayerGestion', function () {
        it('test ', function () {

            var json='{"nbKeel" : 10,"nbFrames" : 3,"players": ["player1","player2"]}';
            createGrid(JSON.parse(json));
            playingPlayerGestion("player1");
            playingPlayerGestion("player2");
            
            json = `{"player":{"player1":{"frames":[{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null},{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null},{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null}],"isPlaying":true,"currentFrame":1,"nbThrow":1},"player2":{"frames":[{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null},{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null},{"c1":0,"c2":0,"c3":0,"score":null,"totalScore":null}],"isPlaying":true,"currentFrame":1,"nbThrow":1}},"nbKeel":10,"nbFrame":3}`;
            
            assert.equal(getGrid(),json);

        });
    });

});
