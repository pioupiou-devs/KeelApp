const assert = require('assert');
const Grid = require('../../src/server/models/grid');
const Frame = require('../../src/server/models/frame');
const Player = require('../../src/server/models/player');

describe('Player', function () {
    describe('constructor', function () {
        it('should create a new Player', function () {
            let player = new Player();
            assert.notEqual(player, null);
        });
    });

    describe('Methods', function () {
        describe('constructFrameList', function () {
            it('should return a list of 10 frames', function () {
                let player = new Player();
                let frameList = player.constructFrameList();
                assert.equal(frameList.length, 10);
            });
            it('should return a list of 10 frames with the correct type', function () {
                let player = new Player();
                let frameList = player.constructFrameList();
                assert.equal(frameList.length, 10);
                for (let i = 0; i < frameList.length; i++) {
                    assert.equal(frameList[i] instanceof Frame, true);
                }
            });
            it('should return a list of 10 frames with the correct values', function () {
                let player = new Player();
                let frameList = player.constructFrameList();
                assert.equal(frameList.length, 10);
                for (let i = 0; i < frameList.length; i++) {
                    assert.equal(frameList[i].c1, 0);
                    assert.equal(frameList[i].c2, 0);
                    assert.equal(frameList[i].c3, 0);
                    assert.equal(frameList[i].score, null);
                    assert.equal(frameList[i].totalScore, null);
                }
            });
        });
    });
});