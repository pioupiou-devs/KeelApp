const Frame = require('./frame');

class Grid {
    constructor() {
        this.players = new Map();
    }

    addPlayer(player) {
        if (player == null) throw new Error('Player is undefined');

        if (typeof player !== 'string') throw new Error('Player is not a string');

        if (player.trim() === '') throw new Error('Player is empty');


        this.players.set(player, this.constructFrameList());
    }

    constructFrameList() {
        let frameList = [];

        for (let i = 0; i < 10; i++) {
            frameList.push(new Frame());
        }

        return frameList;
    }

    calculFrame(frameTable, mancheNumber) {

        if (mancheNumber == 10) {
            frameTable[mancheNumber - 1].setScore(calcFrame10(frameTable[mancheNumber - 1]));
        } else {

            if (frameTable[mancheNumber - 1].getC1() == 10) { //case of a strike


                if (frameTable[mancheNumber].getC1() == 10) { //case 2 strikes in a row
                    if (mancheNumber == 9) { // case of the 9th frame with 2 strikes in a row
                        frameTable[mancheNumber - 1].setScore(20 + frameTable[mancheNumber].getC2());
                    } else {
                        frameTable[mancheNumber - 1].setScore(20 + frameTable[mancheNumber + 1].getC1());
                    }

                } else {
                    frameTable[mancheNumber - 1].setScore(10 + frameTable[mancheNumber].getC1() + frameTable[mancheNumber].getC2());
                }


            } else {
                if (frameTable[mancheNumber - 1].getC1() + frameTable[mancheNumber - 1].getC2() == 10) { //case of a spare
                    frameTable[mancheNumber - 1].setScore(10 + frameTable[mancheNumber].getC1());

                } else { //no spare, no strike
                    frameTable[mancheNumber - 1].setScore(frameTable[mancheNumber - 1].getC1() + frameTable[mancheNumber - 1].getC2());
                }
            }
        }

        return frameTable[mancheNumber - 1].getScore();
    }


    calculScoreTotal(frameTable) {
        sum = 0;
        for (let i = 1; i < 11; i = i + 1) {
            sum = sum + calculFrame(frameTable, i);
            frameTable[i - 1].setTotalScore(sum);
        }
        return sum;
    }



    calcFrame10(frame) {
        if (!(frame instanceof (Frame))) { //also cover undefined and null
            return 0;
        }

        var result = 0;
        if (frame.getC1() === null) {
            return result;
        }
        result = frame.getC1();

        if (result === 10) { // we got a strike on the first throw
            if (frame.getC2() === null) {
                return result;
            }
            result += frame.getC2();

            if (frame.getC3() === null) {
                return result;
            }
            result += frame.getC3();

            return result;
        }

        if (frame.getC2() === null) {
            return result;
        }
        result += frame.getC2();

        if (result === 10) { // we got a spare
            if (frame.getC3() === null) {
                return result;
            }
            result += frame.getC3();
            return result;
        }
        else { // we got a normal round with only 2 throws
            return result;
        }
    }
}

module.exports = Grid;