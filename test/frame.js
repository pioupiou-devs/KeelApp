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
                assert.equal(frame.leftValue, null);
                assert.equal(frame.rightValue, null);
                assert.equal(frame.centerValue, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });
        });

        describe('leftValue', function () {
            it('should create a new Frame', function () {
                let frame = new Frame(1);
                assert.notEqual(frame, null);
            });

            it('should create an empty frame with null', function () {
                let frame = new Frame(null);
                assert.equal(frame.leftValue, null);
                assert.equal(frame.rightValue, null);
                assert.equal(frame.centerValue, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should create an empty frame with undefined', function () {
                let frame = new Frame(undefined);
                assert.equal(frame.leftValue, null);
                assert.equal(frame.rightValue, null);
                assert.equal(frame.centerValue, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should no create a frame with NaN', function () {
                assert.throws(() => new Frame(NaN), Error);
            });

            it('should create a frame with correct default values', function () {
                let frame = new Frame(1);
                assert.equal(frame.leftValue, 1);
                assert.equal(frame.rightValue, null);
                assert.equal(frame.centerValue, null);
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

        describe('leftValue, rightValue', function () {
            it('should create a new Frame', function () {
                let frame = new Frame(1, 2);
                assert.notEqual(frame, null);
            });

            it('should create a frame with correct default values', function () {
                let frame = new Frame(1, 2);
                assert.equal(frame.leftValue, 1);
                assert.equal(frame.rightValue, 2);
                assert.equal(frame.centerValue, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should create an empty frame with two null', function () {
                let frame = new Frame(null, null);
                assert.equal(frame.leftValue, null);
                assert.equal(frame.rightValue, null);
                assert.equal(frame.centerValue, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should create an empty frame with two undefined', function () {
                let frame = new Frame(undefined, undefined);
                assert.equal(frame.leftValue, null);
                assert.equal(frame.rightValue, null);
                assert.equal(frame.centerValue, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should not create a frame with two NaN', function () {
                assert.throws(() => new Frame(NaN, NaN), Error);
            });

            it('should not create a frame with a leftValue greater than 10', function () {
                assert.throws(() => new Frame(11, 0), Error);
            });

            it('should not create a frame with a leftValue less than 0', function () {
                assert.throws(() => new Frame(-1, 0), Error);
            });

            it('should not create a frame with a leftValue that is not a number', function () {
                assert.throws(() => new Frame('a', 0), Error);
            });

            it('should not create a frame with a rightValue greater than 10', function () {
                assert.throws(() => new Frame(0, 11), Error);
            });

            it('should not create a frame with a rightValue less than 0', function () {
                assert.throws(() => new Frame(0, -1), Error);
            });

            it('should not create a frame with a rightValue that is not a number', function () {
                assert.throws(() => new Frame(0, 'a'), Error);
            });
        });

        describe('leftValue, rightValue, centerValue', function () {
            it('should create a new Frame', function () {
                let frame = new Frame(1, 2, 3);
                assert.notEqual(frame, null);
            });

            it('should create a frame with correct default values', function () {
                let frame = new Frame(1, 2, 3);
                assert.equal(frame.leftValue, 1);
                assert.equal(frame.rightValue, 2);
                assert.equal(frame.centerValue, 3);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should create an empty frame with three null', function () {
                let frame = new Frame(null, null, null);
                assert.equal(frame.leftValue, null);
                assert.equal(frame.rightValue, null);
                assert.equal(frame.centerValue, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should create an empty frame with three undefined', function () {
                let frame = new Frame(undefined, undefined, undefined);
                assert.equal(frame.leftValue, null);
                assert.equal(frame.rightValue, null);
                assert.equal(frame.centerValue, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should not create a frame with three NaN', function () {
                assert.throws(() => new Frame(NaN, NaN, NaN), Error);
            });

            it('should not create a frame with a leftValue greater than 10', function () {
                assert.throws(() => new Frame(11, 0, 0), Error);
            });

            it('should not create a frame with a leftValue less than 0', function () {
                assert.throws(() => new Frame(-1, 0, 0), Error);
            });

            it('should not create a frame with a leftValue that is not a number', function () {
                assert.throws(() => new Frame('a', 0, 0), Error);
            });

            it('should not create a frame with a rightValue greater than 10', function () {
                assert.throws(() => new Frame(0, 11, 0), Error);
            });

            it('should not create a frame with a rightValue less than 0', function () {
                assert.throws(() => new Frame(0, -1, 0), Error);
            });

            it('should not create a frame with a rightValue that is not a number', function () {
                assert.throws(() => new Frame(0, 'a', 0), Error);
            });

            it('should not create a frame with a centerValue greater than 10', function () {
                assert.throws(() => new Frame(0, 0, 11), Error);
            });

            it('should not create a frame with a centerValue less than 0', function () {
                assert.throws(() => new Frame(0, 0, -1), Error);
            });

            it('should not create a frame with a centerValue that is not a number', function () {
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
        describe('getLeftValue', function () {
            it('should return the left value', function () {
                let frame = new Frame(1, 2, 3);
                assert.equal(frame.getLeftValue(), 1);
            });
        });

        describe('getRightValue', function () {
            it('should return the right value', function () {
                let frame = new Frame(1, 2, 3);
                assert.equal(frame.getRightValue(), 2);
            });
        });

        describe('getCenterValue', function () {
            it('should return the center value', function () {
                let frame = new Frame(1, 2, 3);
                assert.equal(frame.getCenterValue(), 3);
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

        describe('setLeftValue', function () {
            it('should set the left value', function () {
                let frame = new Frame(1, 2, 3);
                frame.setLeftValue(4);
                assert.equal(frame.getLeftValue(), 4);
            });
        });

        describe('setRightValue', function () {
            it('should set the right value', function () {
                let frame = new Frame(1, 2, 3);
                frame.setRightValue(4);
                assert.equal(frame.getRightValue(), 4);
            });
        });

        describe('setCenterValue', function () {
            it('should set the center value', function () {
                let frame = new Frame(1, 2, 3);
                frame.setCenterValue(4);
                assert.equal(frame.getCenterValue(), 4);
            });
        });

        describe('setScore', function () {
            it('should set the score', function () {
                let frame = new Frame(1, 2, 3);
                frame.setScore(4);
                assert.equal(frame.getScore(), 4);
            });
        });

        describe('setTotalScore', function () {
            it('should set the total score', function () {
                let frame = new Frame(1, 2, 3);
                frame.setTotalScore(4);
                assert.equal(frame.getTotalScore(), 4);
            });
        });
    });

});