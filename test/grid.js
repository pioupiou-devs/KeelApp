const assert = require('assert');
const Grid = require('../src/client/grid');
const Frame = require('../src/client/frame');

describe('Grid', function () {
    describe('constructor', function () {
        it('should create a new Grid', function () {
            let grid = new Grid();
            assert.notEqual(grid, null);
        });

        it('should create a new Grid with correct types', function () {
            let grid = new Grid();
            assert.equal(grid.players instanceof [{}], true);
        });

        it('should create a new Grid with correct values', function () {
            let grid = new Grid();
            assert.equal(grid.players.size, 0);
        });

        it('should work with multiple Grids', function () {
            let grid1 = new Grid();
            let grid2 = new Grid();
            assert.notEqual(grid1, null);
            assert.notEqual(grid2, null);
        });

        it('should work with multiple Grids with correct types', function () {
            let grid1 = new Grid();
            let grid2 = new Grid();
            assert.equal(grid1.players instanceof [{}], true);
            assert.equal(grid2.players instanceof [{}], true);
        });

        it('should work with multiple Grids with correct values', function () {
            let grid1 = new Grid();
            let grid2 = new Grid();
            assert.equal(grid1.players.size, 0);
            assert.equal(grid2.players.size, 0);
        });
    });

    describe('Methods', function () {
        describe('addPlayer', function () {
            it('should add a player to the grid', function () {
                let grid = new Grid();
                let player = 'player1';
                grid.addPlayer(player);
                assert.equal(grid.players.size, 1);
                assert.equal(grid.players.get(player).length, 10);
            });

            it('should add the player to the grid even if the player already exist in the grid', function () {
                let grid = new Grid();
                let player = 'player1';
                grid.addPlayer(player);
                grid.addPlayer(player);
                assert.equal(grid.players.size, 2);
                assert.equal(grid.players.get(player).length, 10);
            });

            it('should add the player with correct types', function () {
                let grid = new Grid();
                let player = 'player1';
                grid.addPlayer(player);
                let frameList = grid.players.get(player);
                assert.equal(frameList.length, 10);
                for (let i = 0; i < frameList.length; i++) {
                    assert.equal(frameList[i] instanceof Frame, true);
                }
            });

            it('should add the player with correct values', function () {
                let grid = new Grid();
                let player = 'player1';
                grid.addPlayer(player);
                let frameList = grid.players.get(player);
                assert.equal(frameList.length, 10);
                for (let i = 0; i < frameList.length; i++) {
                    assert.equal(frameList[i].leftValue, null);
                    assert.equal(frameList[i].rightValue, null);
                    assert.equal(frameList[i].centerValue, null);
                    assert.equal(frameList[i].score, null);
                    assert.equal(frameList[i].totalScore, null);
                }
            });

            it('shoudl work with multiple players', function () {
                let grid = new Grid();
                let player1 = 'player1';
                let player2 = 'player2';
                grid.addPlayer(player1);
                grid.addPlayer(player2);
                assert.equal(grid.players.size, 2);
                assert.equal(grid.players.get(player1).length, 10);
                assert.equal(grid.players.get(player2).length, 10);
            });

            it('should work with multiple players with correct types', function () {
                let grid = new Grid();
                let player1 = 'player1';
                let player2 = 'player2';
                grid.addPlayer(player1);
                grid.addPlayer(player2);
                let frameList1 = grid.players.get(player1);
                let frameList2 = grid.players.get(player2);
                assert.equal(frameList1.length, 10);
                assert.equal(frameList2.length, 10);
                for (let i = 0; i < frameList1.length; i++) {
                    assert.equal(frameList1[i] instanceof Frame, true);
                }
                for (let i = 0; i < frameList2.length; i++) {
                    assert.equal(frameList2[i] instanceof Frame, true);
                }
            });

            it('should work with multiple players with correct values', function () {
                let grid = new Grid();
                let player1 = 'player1';
                let player2 = 'player2';
                grid.addPlayer(player1);
                grid.addPlayer(player2);
                let frameList1 = grid.players.get(player1);
                let frameList2 = grid.players.get(player2);
                assert.equal(frameList1.length, 10);
                assert.equal(frameList2.length, 10);
                for (let i = 0; i < frameList1.length; i++) {
                    assert.equal(frameList1[i].leftValue, null);
                    assert.equal(frameList1[i].rightValue, null);
                    assert.equal(frameList1[i].centerValue, null);
                    assert.equal(frameList1[i].score, null);
                    assert.equal(frameList1[i].totalScore, null);
                }
                for (let i = 0; i < frameList2.length; i++) {
                    assert.equal(frameList2[i].leftValue, null);
                    assert.equal(frameList2[i].rightValue, null);
                    assert.equal(frameList2[i].centerValue, null);
                    assert.equal(frameList2[i].score, null);
                    assert.equal(frameList2[i].totalScore, null);
                }
            });

            it(' should not add the player if the player is not a string', function () {
                let grid = new Grid();
                let player = 1;
                grid.addPlayer(player);
                assert.equal(grid.players.size, 0);
            });

            it('should not add the player if the player is an empty string', function () {
                let grid = new Grid();
                let player = '';
                grid.addPlayer(player);
                assert.equal(grid.players.size, 0);
            });

            it('should not add the player if the player is a string with only spaces', function () {
                let grid = new Grid();
                let player = ' ';
                grid.addPlayer(player);
                assert.equal(grid.players.size, 0);
            });

            it(' should not work with multiple players if one of the players is not a string', function () {
                let grid = new Grid();
                let player1 = 'player1';
                let player2 = 1;
                grid.addPlayer(player1);
                grid.addPlayer(player2);
                assert.equal(grid.players.size, 1);
                assert.equal(grid.players.get(player1).length, 10);
            });

            it(' should not work with multiple players if one of the players is an empty string', function () {
                let grid = new Grid();
                let player1 = 'player1';
                let player2 = '';
                grid.addPlayer(player1);
                grid.addPlayer(player2);
                assert.equal(grid.players.size, 1);
                assert.equal(grid.players.get(player1).length, 10);
            });

            it(' should not work with multiple players if one of the players is a string with only spaces', function () {
                let grid = new Grid();
                let player1 = 'player1';
                let player2 = ' ';
                grid.addPlayer(player1);
                grid.addPlayer(player2);
                assert.equal(grid.players.size, 1);
                assert.equal(grid.players.get(player1).length, 10);
            });

            it('should not work if no player is provided', function () {
                let grid = new Grid();
                grid.addPlayer();
                assert.equal(grid.players.size, 0);
            });
        });

        describe('constructFrameList', function () {
            it('should return a list of 10 frames', function () {
                let grid = new Grid();
                let frameList = grid.constructFrameList();
                assert.equal(frameList.length, 10);
            });

            it('should return a list of 10 frames with the correct type', function () {
                let grid = new Grid();
                let frameList = grid.constructFrameList();
                assert.equal(frameList.length, 10);
                for (let i = 0; i < frameList.length; i++) {
                    assert.equal(frameList[i] instanceof Frame, true);
                }
            });

            it('should return a list of 10 frames with the correct values', function () {
                let grid = new Grid();
                let frameList = grid.constructFrameList();
                assert.equal(frameList.length, 10);
                for (let i = 0; i < frameList.length; i++) {
                    assert.equal(frameList[i].leftValue, null);
                    assert.equal(frameList[i].rightValue, null);
                    assert.equal(frameList[i].centerValue, null);
                    assert.equal(frameList[i].score, null);
                    assert.equal(frameList[i].totalScore, null);
                }
            });
        });
    });
});