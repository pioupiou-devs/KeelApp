const assert = require('assert');
const Frame = require('../src/client/frame.js');

describe('Frame', function () {
    describe('constructor', function () {
        describe('empty', function () {
            it('should create a new Frame', function () {
                let frame = new Frame();
                assert.notEqual(frame, null);
            });

            it ('should create a frame with correct default values', function () {
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

            it ('should create a frame with correct default values', function () {
                let frame = new Frame(1);
                assert.equal(frame.leftValue, 1);
                assert.equal(frame.rightValue, null);
                assert.equal(frame.centerValue, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should not create a frame with a string', function () {
                assert.throws(() => {
                    new Frame('a');
                }, new Error("Invalid data provided"));
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

            it('should not create a frame with empty string', function () {
                assert.throws(() => {
                    new Frame('');
                }, new Error("Invalid data provided"));
            });
        });

        describe('leftValue, rightValue', function () {
            it('should create a new Frame', function () {
                let frame = new Frame(1, 2);
                assert.notEqual(frame, null);
            });

            it ('should create a frame with correct default values', function () {
                let frame = new Frame(1, 2);
                assert.equal(frame.leftValue, 1);
                assert.equal(frame.rightValue, 2);
                assert.equal(frame.centerValue, null);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should not create a frame with two string', function () {
                assert.throws(() => {
                    new Frame('a', 'b');
                }, new Error("Invalid data provided"));
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

            it('should not create a frame with two empty string', function () {
                assert.throws(() => {
                    new Frame('', '');
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with two NaN', function () {
                assert.throws(() => {
                    new Frame(NaN, NaN);
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with a string and a number', function () {
                assert.throws(() => {
                    new Frame('a', 1);
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with a number and a string', function () {
                assert.throws(() => {
                    new Frame(1, 'a');
                }, new Error("Invalid data provided"));
            });
        });

        describe('leftValue, rightValue, centerValue', function () {
            it('should create a new Frame', function () {
                let frame = new Frame(1, 2, 3);
                assert.notEqual(frame, null);
            });

            it ('should create a frame with correct default values', function () {
                let frame = new Frame(1, 2, 3);
                assert.equal(frame.leftValue, 1);
                assert.equal(frame.rightValue, 2);
                assert.equal(frame.centerValue, 3);
                assert.equal(frame.score, null);
                assert.equal(frame.totalScore, null);
            });

            it('should not create a frame with three string', function () {
                assert.throws(() => {
                    new Frame('a', 'b', 'c');
                }, new Error("Invalid data provided"));
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

            it('should not create a frame with three empty string', function () {
                assert.throws(() => {
                    new Frame('', '', '');
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with three NaN', function () {
                assert.throws(() => {
                    new Frame(NaN, NaN, NaN);
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with a string and two number', function () {
                assert.throws(() => {
                    new Frame('a', 1, 2);
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with two string and a number', function () {
                assert.throws(() => {
                    new Frame('a', 'b', 1);
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with a number between two string', function () {
                assert.throws(() => {
                    new Frame('a', 1, 'b');
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with two number and a string', function () {
                assert.throws(() => {
                    new Frame(1, 2, 'a');
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with a string and two number', function () {
                assert.throws(() => {
                    new Frame('a', 1, 2);
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with a number and two string', function () {
                assert.throws(() => {
                    new Frame(1, 'a', 'b');
                }, new Error("Invalid data provided"));
            });

            it('should not create a frame with two string and a number', function () {
                assert.throws(() => {
                    new Frame('a', 'b', 1);
                }, new Error("Invalid data provided"));
            });
        });
    });

    describe('isValid', function () {
        it('should return true for a valid frame', function () {
            assert.throws(() => {
                new Frame(1, 2);
            }, new Error("Invalid data provided"));
        });
    });
});