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

            it('should create a frame with correct default values', function () {
                let frame = new Frame(1);
                assert.equal(frame.leftValue, 1);
                assert.equal(frame.rightValue, null);
                assert.equal(frame.centerValue, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should not create a frame with null', function () {
                assert.throws(() => {
                    new Frame(null);
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with undefined', function () {
                assert.throws(() => {
                    new Frame(undefined);
                }, new Error("Invalid data provided"));
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

            it('should not create a frame with two null', function () {
                assert.throws(() => {
                    new Frame(null, null);
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with two undefined', function () {
                assert.throws(() => {
                    new Frame(undefined, undefined);
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with two NaN', function () {
                assert.throws(() => {
                    new Frame(NaN, NaN);
                }, new Error("Invalid data provided"));
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

            it('should not create a frame with three null', function () {
                assert.throws(() => {
                    new Frame(null, null, null);
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with three undefined', function () {
                assert.throws(() => {
                    new Frame(undefined, undefined, undefined);
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with three NaN', function () {
                assert.throws(() => {
                    new Frame(NaN, NaN, NaN);
                }, new Error("Invalid data provided"));
            });
        });
    });

    describe('Methods', function () {
        describe('isValid', function () {
            it('should return true for a valid frame', function () {
                assert.throws(() => {
                    new Frame(1, 2);
                }, new Error("Invalid data provided"));
            });

            it('should return false for a frame with a left value of null', function () {
                assert.throws(() => {
                    new Frame(null, 2);
                }, new Error("Invalid data provided"));
            });

            it('should return false for a frame with a right value of null', function () {
                assert.throws(() => {
                    new Frame(1, null);
                }, new Error("Invalid data provided"));
            });

            it('should return false for a frame with a left value of undefined', function () {
                assert.throws(() => {
                    new Frame(undefined, 2);
                }, new Error("Invalid data provided"));
            });

            it('should return false for a frame with a right value of undefined', function () {
                assert.throws(() => {
                    new Frame(1, undefined);
                }, new Error("Invalid data provided"));
            });

            it('should return false for a frame with a left value of NaN', function () {
                assert.throws(() => {
                    new Frame(NaN, 2);
                }, new Error("Invalid data provided"));
            });

            it('should return false for a frame with a right value of NaN', function () {
                assert.throws(() => {
                    new Frame(1, NaN);
                }, new Error("Invalid data provided"));
            });

            it('should return false for a frame with a left value of a negative number', function () {
                assert.throws(() => {
                    new Frame(-1, 2);
                }, new Error("Invalid data provided"));
            });

            it('should return false for a frame with a right value of a negative number', function () {
                assert.throws(() => {
                    new Frame(1, -2);
                }, new Error("Invalid data provided"));
            });

            it('should return false for a frame with a left value of a number greater than 10', function () {
                assert.throws(() => {
                    new Frame(11, 2);
                }, new Error("Invalid data provided"));
            });

            it('should return false for a frame with a right value of a number greater than 10', function () {
                assert.throws(() => {
                    new Frame(1, 11);
                }, new Error("Invalid data provided"));
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