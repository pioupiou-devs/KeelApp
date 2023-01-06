const assert = require('assert');
const Frame = require('../src/client/frame.js');

describe('Frame', function () {
    describe('constructor', function () {
        describe('empty', function () {
            it('should create a new Frame', function () {
                let frame = new Frame();
                assert.notEqual(frame, null);
            });

            it('should create a frame with correct default values', function () {
                let frame = new Frame();
                assert.equal(frame.c1, null);
                assert.equal(frame.c2, null);
                assert.equal(frame.c3, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });
        });

        describe('c1', function () {
            it('should create a new Frame', function () {
                let frame = new Frame(1);
                assert.notEqual(frame, null);
            });

            it('should create an empty frame with null', function () {
                let frame = new Frame(null);
                assert.equal(frame.c1, null);
                assert.equal(frame.c2, null);
                assert.equal(frame.c3, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should create an empty frame with undefined', function () {
                let frame = new Frame(undefined);
                assert.equal(frame.c1, null);
                assert.equal(frame.c2, null);
                assert.equal(frame.c3, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should no create a frame with NaN', function () {
                assert.throws(() => new Frame(NaN), Error);
            });

            it('should create a frame with correct default values', function () {
                let frame = new Frame(1);
                assert.equal(frame.c1, 1);
                assert.equal(frame.c2, null);
                assert.equal(frame.c3, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should not create a frame with a value greater than 10', function () {
                assert.throws(() => new Frame(11), Error);
            });

            it('should not create a frame with a value less than 0', function () {
                assert.throws(() => new Frame(-1), Error);
            });

            it('should not create a frame with a value that is not a number', function () {
                assert.throws(() => new Frame('a'), Error);
            });
        });

        describe('c1, c2', function () {
            it('should create a new Frame', function () {
                let frame = new Frame(1, 2);
                assert.notEqual(frame, null);
            });

            it('should create a frame with correct default values', function () {
                let frame = new Frame(1, 2);
                assert.equal(frame.c1, 1);
                assert.equal(frame.c2, 2);
                assert.equal(frame.c3, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should create an empty frame with two null', function () {
                let frame = new Frame(null, null);
                assert.equal(frame.c1, null);
                assert.equal(frame.c2, null);
                assert.equal(frame.c3, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should create an empty frame with two undefined', function () {
                let frame = new Frame(undefined, undefined);
                assert.equal(frame.c1, null);
                assert.equal(frame.c2, null);
                assert.equal(frame.c3, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should not create a frame with two NaN', function () {
                assert.throws(() => new Frame(NaN, NaN), Error);
            });

            it('should not create a frame with a c1 greater than 10', function () {
                assert.throws(() => new Frame(11, 0), Error);
            });

            it('should not create a frame with a c1 less than 0', function () {
                assert.throws(() => new Frame(-1, 0), Error);
            });

            it('should not create a frame with a c1 that is not a number', function () {
                assert.throws(() => new Frame('a', 0), Error);
            });

            it('should not create a frame with a c2 greater than 10', function () {
                assert.throws(() => new Frame(0, 11), Error);
            });

            it('should not create a frame with a c2 less than 0', function () {
                assert.throws(() => new Frame(0, -1), Error);
            });

            it('should not create a frame with a c2 that is not a number', function () {
                assert.throws(() => new Frame(0, 'a'), Error);
            });
        });

        describe('c1, c2, c3', function () {
            it('should create a new Frame', function () {
                let frame = new Frame(1, 2, 3);
                assert.notEqual(frame, null);
            });

            it('should create a frame with correct default values', function () {
                let frame = new Frame(1, 2, 3);
                assert.equal(frame.c1, 1);
                assert.equal(frame.c2, 2);
                assert.equal(frame.c3, 3);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should create an empty frame with three null', function () {
                let frame = new Frame(null, null, null);
                assert.equal(frame.c1, null);
                assert.equal(frame.c2, null);
                assert.equal(frame.c3, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should create an empty frame with three undefined', function () {
                let frame = new Frame(undefined, undefined, undefined);
                assert.equal(frame.c1, null);
                assert.equal(frame.c2, null);
                assert.equal(frame.c3, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should not create a frame with three NaN', function () {
                assert.throws(() => new Frame(NaN, NaN, NaN), Error);
            });

            it('should not create a frame with a c1 greater than 10', function () {
                assert.throws(() => new Frame(11, 0, 0), Error);
            });

            it('should not create a frame with a c1 less than 0', function () {
                assert.throws(() => new Frame(-1, 0, 0), Error);
            });

            it('should not create a frame with a c1 that is not a number', function () {
                assert.throws(() => new Frame('a', 0, 0), Error);
            });

            it('should not create a frame with a c2 greater than 10', function () {
                assert.throws(() => new Frame(0, 11, 0), Error);
            });

            it('should not create a frame with a c2 less than 0', function () {
                assert.throws(() => new Frame(0, -1, 0), Error);
            });

            it('should not create a frame with a c2 that is not a number', function () {
                assert.throws(() => new Frame(0, 'a', 0), Error);
            });

            it('should not create a frame with a c3 greater than 10', function () {
                assert.throws(() => new Frame(0, 0, 11), Error);
            });

            it('should not create a frame with a c3 less than 0', function () {
                assert.throws(() => new Frame(0, 0, -1), Error);
            });

            it('should not create a frame with a c3 that is not a number', function () {
                assert.throws(() => new Frame(0, 0, 'a'), Error);
            });
        });
    });

    describe('Methods', function () {
        describe('isValid', function () {
            it('should return true for a valid set of datas', function () {
                let frame = new Frame();
                assert.equal(frame.isValid(1, 2), true);
            });

            it('should return true for a left value of null', function () {
                let frame = new Frame();
                assert.equal(frame.isValid(null, 2), true);
            });

            it('should return true for a right value of null', function () {
                let frame = new Frame();
                assert.equal(frame.isValid(1, null), true);
            });

            it('should return true for a left value of undefined', function () {
                let frame = new Frame();
                assert.equal(frame.isValid(undefined, 2), true);
            });

            it('should return true for a right value of undefined', function () {
                let frame = new Frame();
                assert.equal(frame.isValid(1, undefined), true);
            });

            it('should return false for a left value of NaN', function () {
                let frame = new Frame();
                assert.equal(frame.isValid(NaN, 2), false);
            });

            it('should return false for a right value of NaN', function () {
                let frame = new Frame();
                assert.equal(frame.isValid(1, NaN), false);
            });

            it('should return false for a left value of a negative number', function () {
                let frame = new Frame();
                assert.equal(frame.isValid(-1, 2), false);
            });

            it('should return false for a right value of a negative number', function () {
                let frame = new Frame();
                assert.equal(frame.isValid(1, -2), false);
            });

            it('should return false for a left value of a number greater than 10', function () {
                let frame = new Frame();
                assert.equal(frame.isValid(11, 2), false);
            });

            it('should return false for a right value of a number greater than 10', function () {
                let frame = new Frame();
                assert.equal(frame.isValid(1, 11), false);
            });
        });
    });

    describe('Getter and Setters', function () {
        describe('getc1', function () {
            it('should return the left value', function () {
                let frame = new Frame(1, 2, 3);
                assert.equal(frame.getC1(), 1);
            });
        });

        describe('getc2', function () {
            it('should return the right value', function () {
                let frame = new Frame(1, 2, 3);
                assert.equal(frame.getC2(), 2);
            });
        });

        describe('getc3', function () {
            it('should return the center value', function () {
                let frame = new Frame(1, 2, 3);
                assert.equal(frame.getC3(), 3);
            });
        });

        describe('getScore', function () {
            it('should return the score', function () {
                let frame = new Frame(1, 2, 3);
                assert.equal(frame.getScore(), null);
            });
        });

        describe('getTotalScore', function () {
            it('should return the total score', function () {
                let frame = new Frame(1, 2, 3);
                assert.equal(frame.getTotalScore(), null);
            });
        });

        describe('setc1', function () {
            it('should set the left value', function () {
                let frame = new Frame(1, 2, 3);
                frame.setC1(4);
                assert.equal(frame.getC1(), 4);
            });
        });

        describe('setc2', function () {
            it('should set the right value', function () {
                let frame = new Frame(1, 2, 3);
                frame.setC2(4);
                assert.equal(frame.getC2(), 4);
            });
        });

        describe('setc3', function () {
            it('should set the center value', function () {
                let frame = new Frame(1, 2, 3);
                frame.setC3(4);
                assert.equal(frame.getC3(), 4);
            });
        });

        describe('setScore', function () {
            it('should set the score', function () {
                let frame = new Frame(1, 2, 3);
                frame.setScore(4);
                assert.equal(frame.getScore(), 4);
            });

            it('should not set the score if the value is not a number', function () {
                let frame = new Frame(1, 2, 3);
                let score = frame.getScore();
                frame.setScore('a');
                assert.equal(frame.getScore(), score);
            });

            it('should not set the score if the value is a negative number', function () {
                let frame = new Frame(1, 2, 3);
                let score = frame.getScore();
                frame.setScore(-1);
                assert.equal(frame.getScore(), score);
            });

            it('should not set the score if the value is a number greater than 30', function () {
                let frame = new Frame(1, 2, 3);
                let score = frame.getScore();
                frame.setScore(31);
                assert.equal(frame.getScore(), score);
            });

            it('should not set the score if the value is null', function () {
                let frame = new Frame(1, 2, 3);
                let score = frame.getScore();
                frame.setScore(null);
                assert.equal(frame.getScore(), score);
            });
        });

        describe('setTotalScore', function () {
            it('should set the total score', function () {
                let frame = new Frame(1, 2, 3);
                frame.setTotalScore(4);
                assert.equal(frame.getTotalScore(), 4);
            });

            it('should not set the total score if the value is not a number', function () {
                let frame = new Frame(1, 2, 3);
                let totalScore = frame.getTotalScore();
                frame.setTotalScore('a');
                assert.equal(frame.getTotalScore(), totalScore);
            });

            it('should not set the total score if the value is a negative number', function () {
                let frame = new Frame(1, 2, 3);
                let totalScore = frame.getTotalScore();
                frame.setTotalScore(-1);
                assert.equal(frame.getTotalScore(), totalScore);
            });

            it('should not set the total score if the value is a number greater than 300', function () {
                let frame = new Frame(1, 2, 3);
                let totalScore = frame.getTotalScore();
                frame.setTotalScore(301);
                assert.equal(frame.getTotalScore(), totalScore);
            });

            it('should not set the total score if the value is null', function () {
                let frame = new Frame(1, 2, 3);
                let totalScore = frame.getTotalScore();
                frame.setTotalScore(null);
                assert.equal(frame.getTotalScore(), totalScore);
            });
        });
    });

});